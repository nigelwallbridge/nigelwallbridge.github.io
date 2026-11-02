/* Standalone numerical comparison. Decimal representations of supplied JS
 * numbers are treated as inputs. BigInt fixed-point logs use 80 decimal places.
 * This does not recover precision already lost before inputs reach the module. */
(function(root){
 const S=10n**80n,GUARD=10n**8n;
 const abs=x=>x<0n?-x:x;
 function fraction(value){
  const text=String(value).toLowerCase(),[mantissa,expText]=text.split('e');
  const exponent=Number(expText||0),parts=mantissa.split('.');
  let n=BigInt(parts.join('')),places=(parts[1]||'').length-exponent;
  return places>=0?{n,d:10n**BigInt(places)}:{n:n*10n**BigInt(-places),d:1n};
 }
 const add=(a,b)=>({n:a.n*b.d+b.n*a.d,d:a.d*b.d});
 function series(n,d){
  const z=(n-d)*S/(n+d),z2=z*z/S;
  let term=z,sum=z;
  for(let k=3n;k<2001n;k+=2n){term=term*z2/S;const piece=term/k;sum+=piece;if(piece===0n)break;}
  return 2n*sum;
 }
 const LN2=series(2n,1n);
 function logRatio(a,b){
  let n=a.n*b.d,d=a.d*b.n,power=0n;
  if(n<=0n||d<=0n)throw RangeError('Logarithm requires positive terminal resources.');
  while(n>=2n*d){d*=2n;power++;}
  while(n<d){n*=2n;power--;}
  return series(n,d)+power*LN2;
 }
 function compare(d,percent=d.p){
  const N=fraction(d.resources),P=fraction(percent),den=100n*P.d,w=P.n,v=den-w;
  const [a,b,c,e]=['A','B','C','D'].map(k=>add(N,fraction(d.pay[k])));
  const badGo=(w!==0n&&a.n<=0n)||(v!==0n&&b.n<=0n);
  const badStay=(w!==0n&&c.n<=0n)||(v!==0n&&e.n<=0n);
  if(badGo||badStay)return {difference:badGo?(badStay?0:-Infinity):Infinity,sign:badGo?(badStay?0:-1):1,resolved:true,exactTie:badGo&&badStay,badGo,badStay,method:'terminal-resource check'};
  const equal=(w===0n||a.n*c.d===c.n*a.d)&&(v===0n||b.n*e.d===e.n*b.d);
  const swapped=w===v&&a.n*e.d===e.n*a.d&&b.n*c.d===c.n*b.d;
  if(equal||swapped)return {difference:0,sign:0,resolved:true,exactTie:true,badGo:false,badStay:false,method:'exact equality'};
  // Fast path uses log1p differences, never subtracts full log utilities.
  const pay=d.pay,p=percent/100;
  const ratio=(x,y)=>Math.log1p((x-y)/(d.resources+y));
  const u=p===0?0:p*ratio(pay.A,pay.C),z=p===1?0:(1-p)*ratio(pay.B,pay.D),fast=u+z;
  const terminals=[a,b,c,e],unsafeSum=terminals.some((x,i)=>{const raw=d.resources+[pay.A,pay.B,pay.C,pay.D][i];return raw<=0||Math.abs(raw)<64*Number.EPSILON*Math.max(Math.abs(d.resources),Math.abs([pay.A,pay.B,pay.C,pay.D][i]));});
  const large=d.resources>1e6*Math.max(1,...Object.values(pay).map(Math.abs));
  if(!large&&!unsafeSum&&Number.isFinite(fast)&&Math.abs(fast)>128*Number.EPSILON*(Math.abs(u)+Math.abs(z)))return {difference:fast,sign:Math.sign(fast),resolved:true,exactTie:false,badGo:false,badStay:false,method:'stable log1p'};
  const total=((w===0n?0n:w*logRatio(a,c))+(v===0n?0n:v*logRatio(b,e)))/den;
  const resolved=abs(total)>GUARD;
  return {difference:Number(total)/Number(S),sign:resolved?(total>0n?1:-1):0,resolved,exactTie:false,badGo:false,badStay:false,method:'80-decimal comparison'};
 }
 function meanSign(d){
  const P=fraction(d.p),den=100n*P.d,w=P.n,v=den-w;
  const [a,b,c,e]=['A','B','C','D'].map(k=>fraction(d.pay[k]));
  const ac={n:a.n*c.d-c.n*a.d,d:a.d*c.d},be={n:b.n*e.d-e.n*b.d,d:b.d*e.d};
  const total=w*ac.n*be.d+v*be.n*ac.d;
  return total===0n?0:total>0n?1:-1;
 }
 root.DeciderPrecision={compare,meanSign};
 if(typeof module!=='undefined')module.exports=root.DeciderPrecision;
})(typeof globalThis!=='undefined'?globalThis:this);
