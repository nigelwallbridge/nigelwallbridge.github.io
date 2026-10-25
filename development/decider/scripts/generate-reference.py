from decimal import Decimal as D,getcontext
from pathlib import Path
import random,json
getcontext().prec=115
r=random.Random(247)
cases=[]
def add(n,p,pay):
 data={'kind':'money','resources':n,'p':p,'pay':dict(zip('ABCD',pay))}
 N=D(str(n));q=D(str(p))/100
 terms=[N+D(str(x)) for x in pay]
 gap=(D(0) if q==0 else q*(terms[0]/terms[2]).ln())+(D(0) if q==1 else (1-q)*(terms[1]/terms[3]).ln())
 if p==50 and pay[0]==pay[3] and pay[1]==pay[2]:gap=D(0)
 cases.append({'input':data,'expectedDifference':str(gap),'sign':0 if gap==0 else (1 if gap>0 else -1)})
for i in range(65):
 n=r.choice([10**3,10**6,10**12,10**18,10**30,10**60]);p=r.choice([0,100,50,60,.0001,.00000001,99.999999])
 pay=[r.randint(-100,100)*r.choice([1,100,1000]) for _ in range(4)]
 if min(pay)+n<=0:n=10**6
 add(n,p,pay)
for n in [200000,4*10**13,5*10**13,10**18,10**30]:add(n,.0001,[30000000,-10,20,20])
add(10**60,50,[1,1,0,0])
add(10**80,50,[1,1,0,0])
add(100,50,[1,2,2,1])
p=Path(__file__).resolve().parent.parent/'tests/reference.json';p.write_text(json.dumps(cases,indent=2),encoding='utf-8')
print(len(cases),'independent 115-digit Decimal reference cases written.')
