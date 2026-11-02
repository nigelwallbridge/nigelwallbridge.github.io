// Worked examples. Inputs are example assumptions, not forecasts or client results.
(function(root){
const items=[
  {
    "id": "advertising",
    "category": "business",
    "kind": "money",
    "question": "Should I spend more on advertising?",
    "teaser": "A promising campaign still has to earn its place in the budget.",
    "person": "Sam",
    "period": "The next three months",
    "story": "Sam runs a small online shop. A proposed campaign could bring in new customers, but the advertising bill is certain even if demand is disappointing. Sam compares running it with keeping the current marketing plan.",
    "situations": [
      "Demand responds well to the campaign",
      "Demand is weaker than hoped"
    ],
    "pay": {
      "A": 6000,
      "B": -3000,
      "C": 0,
      "D": 0
    },
    "p": 50,
    "resources": 25000,
    "notes": {
      "A": "Extra profit after the campaign and delivery costs",
      "B": "The advertising spend is not recovered",
      "C": "No extra profit or expense from the proposed campaign",
      "D": "No extra profit or expense from the proposed campaign"
    },
    "why": "At the assumed chances, the possible gain is worth the possible loss relative to the money Sam has available. Keeping the current plan is the baseline, so both answers for not going ahead are zero.",
    "lesson": "A campaign can be worth trying without being certain to succeed. What matters is the chance of the extra profit, the full cost if demand is weak, and the business’s ability to absorb that cost.",
    "change": "Suppose a closer look at the evidence reduces Sam’s confidence in strong demand from 50% to 30%. With the same costs and resources, the answer changes to holding back.",
    "variant": {
      "p": 30,
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "Spend money to make money? Here, the numbers back it. The Decider gives this campaign the green light.",
    "shortChange": "Lower confidence in demand from 50% to 30%, and the answer becomes No.",
    "perspective": "Business owner"
  },
  {
    "id": "first-employee",
    "category": "business",
    "kind": "money",
    "question": "Should I hire my first employee?",
    "teaser": "Growth is attractive. A wage commitment needs room to breathe.",
    "person": "Alex",
    "period": "The first twelve months",
    "story": "Alex’s design business is turning work away. Hiring could unlock more sales, but a quieter year would still leave a wage bill. Staying solo can also produce a modest gain if demand is strong; that alternative belongs in the comparison.",
    "situations": [
      "Client demand stays strong",
      "Client demand falls short"
    ],
    "pay": {
      "A": 15000,
      "B": -12000,
      "C": 4000,
      "D": 0
    },
    "p": 65,
    "resources": 40000,
    "notes": {
      "A": "Extra profit after wages and other hiring costs",
      "B": "The annual net loss after hiring costs and weaker sales",
      "C": "Some extra work can be handled while staying solo",
      "D": "No change from the current solo operation"
    },
    "why": "Hiring comes out ahead on these assumptions, but only after allowing for the extra profit Alex could earn without hiring. The starting resources provide room for the possible loss.",
    "lesson": "“Don’t hire” is not the same as “earn nothing”. Comparing against a realistic alternative can change an expansion decision. Cash timing and ongoing commitments would need a closer business review too.",
    "change": "If Alex has only £15,000 rather than £40,000 to draw on, the same £12,000 possible loss takes on much more weight. The answer changes to not hiring on this plan.",
    "variant": {
      "resources": 15000,
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "Time to stop doing everything yourself? With this cash cushion, The Decider says the extra earning potential is worth the commitment.",
    "shortChange": "Reduce starting resources from £40,000 to £15,000, and the answer becomes No.",
    "perspective": "Business owner"
  },
  {
    "id": "new-product",
    "category": "business",
    "kind": "money",
    "question": "Should I launch a new product?",
    "teaser": "A launch can have real upside and still need a convincing chance of demand.",
    "person": "Priya",
    "period": "The first six months",
    "story": "Priya is considering a small product launch. She estimates the extra profit after development, stock and launch costs. If she holds back, a strong market could still lift sales of her existing products.",
    "situations": [
      "The market responds well",
      "The market response is disappointing"
    ],
    "pay": {
      "A": 20000,
      "B": -6000,
      "C": 2000,
      "D": 0
    },
    "p": 40,
    "resources": 30000,
    "notes": {
      "A": "Net extra profit after all launch costs",
      "B": "The net loss if sales do not cover the launch costs",
      "C": "Extra profit from existing products in a strong market",
      "D": "No change from the existing range"
    },
    "why": "The launch has the better balance with a 40% chance of the stronger outcome and £30,000 of starting resources. The calculation includes the £2,000 opportunity available without launching.",
    "lesson": "The question is whether this launch beats the best realistic alternative—not simply whether its sales forecast looks exciting. Customer evidence can be valuable if it changes the estimated chance enough to change the choice.",
    "change": "If Priya revises the chance of a strong response down to 25%, keeping everything else the same, the launch no longer comes out ahead.",
    "variant": {
      "p": 25,
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "The launch could flop. But the upside, odds and cash cushion give it enough going for it. The Decider says launch.",
    "shortChange": "Reduce the chance of strong demand from 40% to 25%, and the answer becomes No.",
    "perspective": "Business owner"
  },
  {
    "id": "large-order",
    "category": "business",
    "kind": "money",
    "question": "Should I accept a large but risky order?",
    "teaser": "A bigger order is not automatically a better order.",
    "person": "Lee",
    "period": "Until the order is delivered and paid",
    "story": "A large order would stretch Lee’s small manufacturing business. If delivery and payment go well, it is profitable. If they do not, extra costs or non-payment could be expensive. Declining leaves room for smaller orders.",
    "situations": [
      "Delivery and payment go as hoped",
      "Delivery or payment goes wrong"
    ],
    "pay": {
      "A": 12000,
      "B": -18000,
      "C": 2000,
      "D": 2000
    },
    "p": 70,
    "resources": 25000,
    "notes": {
      "A": "Net profit from completing the large order",
      "B": "Net loss after costs and payment problems",
      "C": "Net profit from smaller orders instead",
      "D": "Net profit from smaller orders instead"
    },
    "why": "Even with a 70% chance of the stronger outcome, the possible £18,000 loss is large relative to £25,000 of starting resources. The steadier £2,000 alternative comes out ahead.",
    "lesson": "A decision can improve by changing the deal, not just by changing your confidence. Payment stages, deposits or a smaller commitment may alter the actual consequences of things going wrong.",
    "change": "Suppose revised payment terms genuinely reduce the possible loss from £18,000 to £8,000, without changing the other estimates. The answer changes to accepting the order.",
    "variant": {
      "pay": {
        "B": -8000
      },
      "expected": true
    },
    "expected": false,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "A big order can be a big headache. One bad outcome eats too much of the business’s money. The Decider says pass.",
    "shortChange": "Reduce the possible loss from £18,000 to £8,000 through credible payment protection, and the answer becomes Yes.",
    "perspective": "Business owner"
  },
  {
    "id": "equipment",
    "category": "business",
    "kind": "money",
    "question": "Should I invest in new equipment?",
    "teaser": "Look beyond the purchase price to what each option leaves you with.",
    "person": "Morgan",
    "period": "The next twelve months",
    "story": "Morgan could replace ageing workshop equipment. The new machine may improve output; if demand disappoints, its cost will be harder to recover. Keeping the old equipment also has financial consequences, including repairs.",
    "situations": [
      "Demand is strong enough to use the extra capacity",
      "Demand is weak"
    ],
    "pay": {
      "A": 8000,
      "B": -4000,
      "C": 1500,
      "D": -500
    },
    "p": 55,
    "resources": 18000,
    "notes": {
      "A": "Extra profit after the new equipment’s costs",
      "B": "Net loss after paying for equipment that is underused",
      "C": "Net profit while keeping the old machine",
      "D": "Net repair and operating loss with the old machine"
    },
    "why": "The new equipment comes out ahead on the assumed price, demand and starting resources. The app compares both answers for buying with both answers for keeping the old machine.",
    "lesson": "The right comparison includes costs, savings and the alternative’s performance over the same period. This simple example does not separately model financing schedules or resale uncertainty.",
    "change": "If the total cost of buying rises by £5,000, both buying outcomes fall by that amount: £8,000 becomes £3,000 and −£4,000 becomes −£9,000. Keeping the old machine then comes out ahead.",
    "variant": {
      "pay": {
        "A": 3000,
        "B": -9000
      },
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "Shiny new kit needs to earn its keep. On these figures, it does. The Decider says invest.",
    "shortChange": "Add £5,000 to the purchase cost in both outcomes, and the answer becomes No.",
    "perspective": "Business owner"
  },
  {
    "id": "training-course",
    "category": "money",
    "kind": "money",
    "question": "Is this training course worth paying for?",
    "teaser": "A useful qualification can still be a different decision for different budgets.",
    "person": "Noor",
    "period": "The next twelve months",
    "story": "Noor is considering a course that might lead to better-paid work. The course fee is paid whether or not that opportunity arrives. Noor compares the net financial outcomes with not taking the course.",
    "situations": [
      "The better-paid opportunity arrives",
      "It does not arrive within the year"
    ],
    "pay": {
      "A": 4000,
      "B": -1200,
      "C": 0,
      "D": 0
    },
    "p": 45,
    "resources": 6000,
    "notes": {
      "A": "Extra earnings after the course fee and related costs",
      "B": "Course and related costs without extra earnings",
      "C": "No extra earnings or course costs",
      "D": "No extra earnings or course costs"
    },
    "why": "With £6,000 to draw on and the stated chance of extra earnings, taking the course has the better balance. The £4,000 is already net of the fee: subtracting that fee again would count it twice.",
    "lesson": "Something can be a worthwhile investment and still be too demanding for a smaller starting balance. The example considers money; enjoyment or confidence would need to be considered separately or valued explicitly.",
    "change": "With starting resources of £1,500 rather than £6,000, the same possible £1,200 loss weighs much more heavily. The answer changes to holding back on these assumptions.",
    "variant": {
      "resources": 1500,
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "A course is an expense now and a possible boost later. With this financial cushion, The Decider backs the investment.",
    "shortChange": "Reduce available resources from £6,000 to £1,500, and the answer becomes No.",
    "perspective": "Personal money choice"
  },
  {
    "id": "lottery-ticket",
    "category": "money",
    "kind": "money",
    "question": "Should I buy a lottery ticket?",
    "teaser": "The money answer and the value of a little hope may differ.",
    "person": "Jamie",
    "period": "When the draw is settled",
    "story": "Jamie considers a hypothetical £2 ticket with a £1 million prize and a one-in-a-million chance of winning. These are invented terms for an example, not the odds of a named lottery. First, Jamie looks only at money.",
    "situations": [
      "The ticket wins",
      "The ticket does not win"
    ],
    "pay": {
      "A": 999998,
      "B": -2,
      "C": 0,
      "D": 0
    },
    "p": 0.0001,
    "resources": 5000,
    "notes": {
      "A": "The £1 million prize less the £2 ticket cost",
      "B": "The ticket cost is lost",
      "C": "No ticket cost and no prize",
      "D": "No ticket cost and no prize"
    },
    "why": "On the strictly financial inputs, the app says not to buy. A large prize does not compensate for its very small chance here. One in a million is entered as 0.0001%, not 0.0001 as a probability fraction.",
    "lesson": "The app can also help you notice what you value beyond cash. Hope or enjoyment is a personal benefit, not extra prize money. Including it changes the question being answered.",
    "change": "Suppose Jamie genuinely values the enjoyment at £3 whether the ticket wins or loses. Adding that value once to each buying outcome gives £1,000,001 and £1. On that broader value comparison, buying comes out ahead. It is not a claim that the ticket is a good financial investment.",
    "variant": {
      "pay": {
        "A": 1000001,
        "B": 1
      },
      "expected": true
    },
    "expected": false,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "A massive jackpot. A microscopic chance. On money alone, The Decider says keep the ticket money.",
    "shortChange": "Value the enjoyment of playing at £3 and include it once in both buying outcomes: the broader-value answer becomes Yes. The financial answer stays No.",
    "perspective": "Personal money choice"
  },
  {
    "id": "repair-or-replace",
    "category": "money",
    "kind": "money",
    "question": "Should I replace my car rather than repair it?",
    "teaser": "Sometimes the better choice is the one with the less painful possible bill.",
    "person": "Taylor",
    "period": "The next twelve months",
    "story": "Taylor must choose between replacing a car and repairing the existing one. Both options cost money. The uncertainty is whether Taylor’s driving needs turn out to be straightforward or expensive to meet.",
    "situations": [
      "The year’s motoring goes smoothly",
      "The year brings expensive problems"
    ],
    "pay": {
      "A": -1500,
      "B": -3500,
      "C": -800,
      "D": -5000
    },
    "p": 70,
    "resources": 10000,
    "notes": {
      "A": "Net cost of the replacement after resale value and running costs",
      "B": "Net cost if the replacement year goes badly",
      "C": "Net repair and running cost for the existing car",
      "D": "Net cost if the existing car brings major problems"
    },
    "why": "Replacing comes out ahead even though every outcome is a cost. The possibility of the much larger repair bill makes keeping the old car less attractive in this comparison.",
    "lesson": "A “good” outcome need not be a gain. Enter losses with minus signs, use the same period, and include resale value or other offsets once. The app compares final positions, not just the cheapest headline price.",
    "change": "If a reliable inspection changes the possible bad-year cost of repairing from £5,000 to £2,500, repairing becomes the better option on the other unchanged estimates.",
    "variant": {
      "pay": {
        "D": -2500
      },
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "Another repair bill—or a fresh start? Here, keeping the old car carries the nastier surprise. The Decider says replace it.",
    "shortChange": "If an inspection reduces the bad repair outcome to a £2,500 cost, keeping the car becomes preferable.",
    "perspective": "Personal money choice"
  },
  {
    "id": "performance-bonus",
    "category": "money",
    "kind": "money",
    "question": "Should I take a job with a performance bonus?",
    "teaser": "Compare the tempting upside with what you would earn by staying.",
    "person": "Ari",
    "period": "The next twelve months",
    "story": "Ari is considering a job with variable pay. Relative to the current position, a strong year could bring £8,000 more and a disappointing year £6,000 less. Staying offers a £2,000 pay rise in either case.",
    "situations": [
      "Performance reaches the hoped-for level",
      "Performance falls short"
    ],
    "pay": {
      "A": 8000,
      "B": -6000,
      "C": 2000,
      "D": 2000
    },
    "p": 65,
    "resources": 15000,
    "notes": {
      "A": "Extra take-home money in the stronger year",
      "B": "Reduction in take-home money in the weaker year",
      "C": "The pay rise from staying",
      "D": "The pay rise from staying"
    },
    "why": "Staying comes out ahead at a 65% chance of the stronger outcome and £15,000 to draw on. The comparison includes the certain £2,000 improvement available without switching.",
    "lesson": "Starting resources are the financial position before these extra gains or losses, not the bonus itself. Job security, working conditions and enjoyment may matter too; this example isolates the financial part.",
    "change": "If better evidence supports a 75% chance of the stronger outcome rather than 65%, the variable-pay job comes out ahead on these financial inputs.",
    "variant": {
      "p": 75,
      "expected": true
    },
    "expected": false,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "That bonus looks tempting. The less exciting guaranteed income wins this round. The Decider says stick with it.",
    "shortChange": "Raise confidence in earning the bonus from 65% to 75%, and the answer becomes Yes.",
    "perspective": "Personal money choice"
  },
  {
    "id": "refundable-booking",
    "category": "money",
    "kind": "money",
    "question": "Should I pay more for a refundable booking?",
    "teaser": "Peace of mind has a price—but so does losing the booking cost.",
    "person": "Robin",
    "period": "Until the trip is completed or cancelled",
    "story": "Robin can pay £1,000 for a non-refundable booking or £1,100 for a refundable one. If the trip is cancelled under the assumed refund terms, £1,000 is returned from the refundable booking and the £100 extra charge is lost.",
    "situations": [
      "The trip goes ahead",
      "The trip must be cancelled"
    ],
    "pay": {
      "A": -1100,
      "B": -100,
      "C": -1000,
      "D": -1000
    },
    "p": 80,
    "resources": 5000,
    "notes": {
      "A": "Total booking cost when the trip happens",
      "B": "Net cost after receiving the assumed refund",
      "C": "Total non-refundable booking cost",
      "D": "The non-refundable booking cost is lost"
    },
    "why": "Paying for the refundable option comes out ahead with the assumed 20% chance of cancellation. The comparison is between actual money changes from today, so every outcome includes the appropriate booking cost.",
    "lesson": "This is a comparison of refund terms, not a forecast of travel disruption. Check what is actually refundable and whether other costs change. Enjoyment of the trip is outside this strictly financial example.",
    "change": "If Robin is instead 95% confident the trip will go ahead, the extra refund protection no longer comes out ahead at this price.",
    "variant": {
      "p": 95,
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "Plans change. Losing the whole booking would sting. The Decider says the extra flexibility is worth paying for.",
    "shortChange": "Raise confidence that the trip will happen from 80% to 95%, and the answer becomes No.",
    "perspective": "Personal money choice"
  },
  {
    "id": "ask-someone-out",
    "category": "happiness",
    "kind": "happiness",
    "question": "Should I ask someone out?",
    "teaser": "Make room for the happiness you hope for and how a no might feel.",
    "person": "Charlie",
    "period": "How the next few weeks might feel",
    "story": "Charlie would like to ask someone out. There may be mutual interest, or there may not. Charlie thinks about both possibilities—and about how it would feel to leave the question unasked.",
    "situations": [
      "There is mutual interest",
      "There is no mutual interest"
    ],
    "pay": {
      "A": 12,
      "B": -6,
      "C": -3,
      "D": 0
    },
    "p": 50,
    "resources": 25,
    "notes": {
      "A": "Happy to have opened the door to a connection",
      "B": "Disappointed by a no",
      "C": "Wondering about an opportunity left unexplored",
      "D": "Comfortable with having left it alone"
    },
    "why": "Going for it has the better balance for Charlie’s feelings, assumed chances and emotional strength. Holding back is not completely neutral: missing a possible connection also matters to Charlie.",
    "lesson": "The example does not tell you whether someone is interested. It helps separate that belief from how each answer would feel. Respectful, pressure-free asking is part of the situation Charlie is imagining.",
    "change": "If Charlie believes there is only a 25% chance of mutual interest rather than 50%, the same feelings lead to holding back. The useful question is whether that lower estimate reflects real evidence or just nerves.",
    "variant": {
      "p": 25,
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "A little awkwardness, a real chance of something good. With these feelings and odds, The Decider says ask.",
    "shortChange": "Lower confidence in the response from 50% to 25%, and the answer becomes No.",
    "perspective": "Personal happiness choice"
  },
  {
    "id": "new-city",
    "category": "happiness",
    "kind": "happiness",
    "question": "Should I move to a new city?",
    "teaser": "A fresh start can be exciting without making every version of the move right.",
    "person": "Jo",
    "period": "The first year after the possible move",
    "story": "Jo is drawn to a new city. Life there might fit well, or it might feel lonely and difficult. Jo also thinks about what staying would mean under those same two possibilities.",
    "situations": [
      "Life in the new city would suit Jo",
      "Life there would not suit Jo"
    ],
    "pay": {
      "A": 22,
      "B": -18,
      "C": 2,
      "D": 0
    },
    "p": 60,
    "resources": 25,
    "notes": {
      "A": "A deeply rewarding fresh start",
      "B": "Very unhappy with how the move has worked out",
      "C": "Some contentment at home, with the move left unexplored",
      "D": "Life at home continues much as before"
    },
    "why": "Holding back comes out ahead on this particular version of the move. The possible unhappiness if it goes wrong weighs heavily against the hoped-for happiness, given Jo’s emotional strength right now.",
    "lesson": "The answer need not mean “never move”. A different plan can have different consequences. The two-situation model cannot capture every part of a major life change, but it can reveal what needs attention.",
    "change": "Suppose Jo can make the move more reversible—perhaps through a shorter first stay—and honestly rates the unhappy outcome at −8 rather than −18. With the other answers unchanged, going for it comes out ahead.",
    "variant": {
      "pay": {
        "B": -8
      },
      "expected": true
    },
    "expected": false,
    "importance": "Life changing",
    "currency": "GBP",
    "shortWhy": "New city, new you? Maybe. But the unhappy version hits hard enough that The Decider says hold off for now.",
    "shortChange": "A short trial that makes the unhappy outcome less painful changes the answer to Yes.",
    "perspective": "Personal happiness choice"
  },
  {
    "id": "difficult-conversation",
    "category": "happiness",
    "kind": "happiness",
    "question": "Should I have that difficult conversation?",
    "teaser": "Saying nothing can have consequences too.",
    "person": "Ellis",
    "period": "The following month",
    "story": "Ellis wants to raise a recurring tension with a friend. The friend might be receptive or might not. Avoiding the conversation could feel uncomfortable even if the friend would have listened.",
    "situations": [
      "The friend is receptive",
      "The friend is not receptive"
    ],
    "pay": {
      "A": 15,
      "B": -8,
      "C": -5,
      "D": -10
    },
    "p": 60,
    "resources": 25,
    "notes": {
      "A": "Relieved and happier with the friendship",
      "B": "Upset by the response",
      "C": "Unhappy that something important remains unsaid",
      "D": "More unhappy as the unresolved tension continues"
    },
    "why": "Having the conversation comes out ahead here. Ellis rates it better than saying nothing in both situations. That is a feature of these answers, not a rule that difficult conversations always go well.",
    "lesson": "Not going ahead is an option with its own emotional consequences. If both outcomes favour the same choice, ask whether you have described the alternative fairly and whether anything important is missing.",
    "change": "If Ellis thinks an unreceptive response would feel much worse—−22 rather than −8—the answer changes to holding back on this approach. Choosing a different time or a gentler way to speak would be a new version to explore.",
    "variant": {
      "pay": {
        "B": -22
      },
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "Awkward now, or still on your mind next week? Both scenarios favour speaking up. The Decider says have the conversation.",
    "shortChange": "If a bad conversation would hurt much more than you first thought, the answer changes to No.",
    "perspective": "Personal happiness choice"
  },
  {
    "id": "new-hobby",
    "category": "happiness",
    "kind": "happiness",
    "question": "Should I try a new hobby?",
    "teaser": "A small experiment may be worth a little disappointment.",
    "person": "Rae",
    "period": "The first four sessions",
    "story": "Rae is considering a beginner’s class. It might be enjoyable, or it might not be a good fit. Rae is deciding about a short trial, not a lifelong commitment.",
    "situations": [
      "The class is a good fit",
      "The class is not a good fit"
    ],
    "pay": {
      "A": 10,
      "B": -3,
      "C": 0,
      "D": 0
    },
    "p": 60,
    "resources": 25,
    "notes": {
      "A": "Pleased to have found something enjoyable",
      "B": "A little bothered that it was not for Rae",
      "C": "An ordinary few weeks without the class",
      "D": "An ordinary few weeks without the class"
    },
    "why": "Trying the class comes out ahead because Rae sees worthwhile enjoyment and only a small amount of possible disappointment. Rae’s answers describe an experiment with room to stop.",
    "lesson": "Keep the decision small enough to describe honestly. “Try four sessions” may feel very different from “take on an expensive year-long commitment”. Any financial cost would need its own consideration.",
    "change": "If the wrong class would actually feel much worse—−12 rather than −3—the answer changes. That might reveal a concern about pressure, time or the particular setting rather than the hobby itself.",
    "variant": {
      "pay": {
        "B": -12
      },
      "expected": false
    },
    "expected": true,
    "importance": "Everyday",
    "currency": "GBP",
    "shortWhy": "You might love it. You might not. The disappointment looks manageable, so The Decider says give it a go.",
    "shortChange": "If an unsuccessful attempt would feel much worse, the answer changes to No.",
    "perspective": "Personal happiness choice"
  },
  {
    "id": "competition",
    "category": "happiness",
    "kind": "happiness",
    "question": "Should I enter a competition?",
    "teaser": "Winning is only part of what entering might mean to you.",
    "person": "Sky",
    "period": "The event and the week afterwards",
    "story": "Sky is thinking about entering a creative competition. The entry might receive the hoped-for response, or it might not. Sitting it out could also leave Sky wishing they had tried.",
    "situations": [
      "The entry receives the hoped-for response",
      "It does not receive that response"
    ],
    "pay": {
      "A": 12,
      "B": -5,
      "C": -2,
      "D": 0
    },
    "p": 35,
    "resources": 25,
    "notes": {
      "A": "Pleased and proud of the response",
      "B": "Disappointed by the response",
      "C": "A little regret about not entering",
      "D": "Content to have left this event alone"
    },
    "why": "Entering narrowly comes out ahead with these answers. The possibility of regret from not entering makes a difference, even though the chance of the hoped-for response is below half.",
    "lesson": "The relevant chance is the chance of the outcome you actually described. Enjoying the work or feeling proud of entering may matter even without a prize; include those feelings in the appropriate answers.",
    "change": "At a 20% chance of the hoped-for response rather than 35%, the same emotional answers favour not entering this time.",
    "variant": {
      "p": 20,
      "expected": false
    },
    "expected": true,
    "importance": "Everyday",
    "currency": "GBP",
    "shortWhy": "You don’t have to be the favourite for entering to be worth it. The Decider says put your name down.",
    "shortChange": "Lower your confidence from 35% to 20%, and the answer becomes No.",
    "perspective": "Personal happiness choice"
  },
  {
    "id": "challenging-role",
    "category": "happiness",
    "kind": "happiness",
    "question": "Should I volunteer for a challenging role?",
    "teaser": "The stretch might be rewarding. How would it feel if it went wrong?",
    "person": "Fin",
    "period": "The first three months in the role",
    "story": "Fin could volunteer to lead a community project. The support and working relationships might be good, or they might be harder than hoped. Declining would leave Fin with a smaller, more familiar contribution.",
    "situations": [
      "The support and working relationships are good",
      "They are harder than hoped"
    ],
    "pay": {
      "A": 18,
      "B": -12,
      "C": 2,
      "D": 0
    },
    "p": 60,
    "resources": 25,
    "notes": {
      "A": "Very pleased with the challenge and contribution",
      "B": "Very upset by how the experience feels",
      "C": "A little pleased with contributing in the familiar way",
      "D": "No particular emotional change from staying with the familiar role"
    },
    "why": "Volunteering comes out ahead at the assumed 60% chance of a supportive experience. The gain over the familiar role is enough here, but the difference is not large.",
    "lesson": "A promising challenge can be sensitive to what you believe about the support around you. Asking concrete questions about the team may be more useful than simply telling yourself to be braver.",
    "change": "At a 50% chance of the supportive outcome rather than 60%, holding back comes out ahead. A clearer agreement about help and responsibilities could also change how Fin rates the outcomes.",
    "variant": {
      "p": 50,
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "A stretch can be exciting as well as scary. With these odds and emotional strength, The Decider says take the role.",
    "shortChange": "Lower confidence in things working out from 60% to 50%, and the answer becomes No.",
    "perspective": "Personal happiness choice"
  },
  {
    "id": "old-friend",
    "category": "happiness",
    "kind": "happiness",
    "question": "Should I reconnect with an old friend?",
    "teaser": "A warm reply would matter—but so might not trying.",
    "person": "Drew",
    "period": "The next few weeks",
    "story": "Drew would like to send a friendly message after a long gap. The friend might welcome it, or might not respond. Drew thinks about the feelings involved rather than trying to make the app guess the friend’s reaction.",
    "situations": [
      "The friend welcomes contact",
      "The friend does not respond warmly"
    ],
    "pay": {
      "A": 12,
      "B": -4,
      "C": -2,
      "D": 0
    },
    "p": 45,
    "resources": 25,
    "notes": {
      "A": "Happy to have renewed the connection",
      "B": "A little disappointed by the response or silence",
      "C": "Some regret about not reaching out",
      "D": "No particular change from leaving things alone"
    },
    "why": "Reaching out comes out ahead on Drew’s answers. The possible pleasure and the small regret of not trying outweigh the disappointment Drew currently imagines.",
    "lesson": "The same unanswered message can feel very different to different people. The app needs your honest answer about that feeling, not someone else’s idea of how much it ought to matter.",
    "change": "If silence would feel much more painful—−16 rather than −4—holding back comes out ahead on this comparison. Drew might instead consider a gentler, lower-pressure way to reconnect.",
    "variant": {
      "pay": {
        "B": -16
      },
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "One message could bring someone back into your life. Here, the possible happiness beats the awkwardness. The Decider says reach out.",
    "shortChange": "If an unhappy response would hurt much more, the answer changes to No.",
    "perspective": "Personal happiness choice"
  },
  {
    "id": "perform-in-public",
    "category": "happiness",
    "kind": "happiness",
    "question": "Should I perform in public?",
    "teaser": "Confidence and nerves are different inputs.",
    "person": "Ash",
    "period": "The performance and the following week",
    "story": "Ash has an opportunity to perform at an open evening. The experience might feel encouraging, or it might feel uncomfortable. Ash would also feel some regret about skipping an evening that could have gone well.",
    "situations": [
      "The evening would feel encouraging",
      "The evening would feel uncomfortable"
    ],
    "pay": {
      "A": 18,
      "B": -10,
      "C": -4,
      "D": 0
    },
    "p": 50,
    "resources": 25,
    "notes": {
      "A": "Very pleased to have taken part",
      "B": "Disappointed and unsettled by the experience",
      "C": "Regret about an opportunity left unexplored",
      "D": "Relief at having kept the evening ordinary"
    },
    "why": "Performing comes out ahead at the assumed chances. That does not mean nerves should disappear; it means the full set of Ash’s answers currently favours taking part.",
    "lesson": "Try to distinguish “I feel nervous” from “I think it is unlikely to be a good experience”. One describes a feeling and the other a belief about what may happen. Both deserve an honest place.",
    "change": "If Ash believes the chance of an encouraging evening is 30% rather than 50%, the result changes to not performing on this occasion.",
    "variant": {
      "p": 30,
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "Nerves don’t automatically mean no. The chance of a great feeling makes this worth a shot. The Decider says step up.",
    "shortChange": "Lower confidence in the performance going as hoped from 50% to 30%, and the answer becomes No.",
    "perspective": "Personal happiness choice"
  },
  {
    "id": "organise-gathering",
    "category": "happiness",
    "kind": "happiness",
    "question": "Should I organise a gathering?",
    "teaser": "You may want the connection without wanting the whole production.",
    "person": "Kit",
    "period": "The planning, evening and day afterwards",
    "story": "Kit would like to bring friends together, but is imagining a large event. It might be enjoyable; if things go wrong, the organising and disappointment could feel overwhelming. A quiet evening is the alternative.",
    "situations": [
      "The gathering is enjoyable",
      "The gathering is disappointing"
    ],
    "pay": {
      "A": 12,
      "B": -20,
      "C": 1,
      "D": 0
    },
    "p": 65,
    "resources": 25,
    "notes": {
      "A": "Happy to have brought people together",
      "B": "Very unhappy with the effort and disappointment",
      "C": "A little pleased with a quiet evening instead",
      "D": "An ordinary quiet evening"
    },
    "why": "Holding back comes out ahead on this large-event plan. The possible unhappiness is substantial relative to the emotional strength Kit feels able to draw on.",
    "lesson": "Sometimes the useful outcome is a better-shaped choice. The wish to see people may be sound while the size, workload or expectations of the plan need to change.",
    "change": "If a smaller, simpler gathering would reduce the disappointing outcome from −20 to −6 while keeping the other answers the same, organising it comes out ahead. That is a changed plan, not a reason to ignore how Kit feels.",
    "variant": {
      "pay": {
        "B": -6
      },
      "expected": true
    },
    "expected": false,
    "importance": "Everyday",
    "currency": "GBP",
    "shortWhy": "Hosting sounds fun—until it feels like a test of whether people like you. The Decider says take some pressure off first.",
    "shortChange": "Make it a smaller gathering with less emotional pressure, and the answer becomes Yes.",
    "perspective": "Personal happiness choice"
  },
  {
    "id": "solo-trip",
    "category": "happiness",
    "kind": "happiness",
    "question": "Should I take a solo trip?",
    "teaser": "Adventure may feel more inviting when the plan fits you.",
    "person": "Quinn",
    "period": "The trip and the first week back",
    "story": "Quinn is considering a first solo trip. The destination and experience might suit them, or the trip might feel lonely and difficult. Staying home would be comfortable but would leave the possibility unexplored.",
    "situations": [
      "The solo experience suits Quinn",
      "The solo experience does not suit Quinn"
    ],
    "pay": {
      "A": 20,
      "B": -14,
      "C": 2,
      "D": 0
    },
    "p": 55,
    "resources": 25,
    "notes": {
      "A": "Very happy with the adventure and independence",
      "B": "Very upset by an experience that feels wrong",
      "C": "A little pleased with familiar comforts at home",
      "D": "No particular emotional change from staying home"
    },
    "why": "Holding back comes out ahead on this version of the trip. The possible unhappy experience carries enough weight to offset the happiness Quinn hopes for.",
    "lesson": "A shorter first trip, a familiar destination or some planned company could change the experience itself. Money and practical safety also matter; this example isolates the emotional comparison.",
    "change": "If a shorter trial trip would make the unhappy outcome feel like −6 rather than −14, going for it comes out ahead with the same chances and starting emotional strength.",
    "variant": {
      "pay": {
        "B": -6
      },
      "expected": true
    },
    "expected": false,
    "importance": "Pretty important",
    "currency": "GBP",
    "shortWhy": "Freedom sounds great. Feeling miserable far from home, less so. The Decider says make the first adventure a little easier.",
    "shortChange": "A shorter, easier first trip reduces the emotional downside enough to change the answer to Yes.",
    "perspective": "Personal happiness choice"
  },
  {
    "id": "heathrow-third-runway",
    "category": "public",
    "kind": "money",
    "question": "Should there be a third runway at London Heathrow?",
    "teaser": "A major opportunity. A major financial exposure.",
    "person": "The decision team",
    "period": "Long-term project outcomes, valued consistently in today’s money",
    "story": "An investment committee compares committing to expansion with retaining the existing business. This is the investor’s financial choice; permission to build is a separate public decision.",
    "situations": [
      "Demand, charges and delivery support the investment",
      "Commercial performance or delivery disappoints"
    ],
    "pay": {
      "A": 20000000000.0,
      "B": -20000000000.0,
      "C": -5000000000.0,
      "D": 0
    },
    "p": 60,
    "resources": 30000000000.0,
    "notes": {
      "A": "Net gain after investment costs",
      "B": "Net loss after costs and remaining asset value",
      "C": "The existing business loses value as competitors capture growth; not missed expansion profit counted again",
      "D": "The existing business preserves its starting value"
    },
    "why": "The upside is attractive, but the possible £20bn loss takes too much of the investors’ £30bn financial cushion.",
    "shortWhy": "A £20bn win sounds great. A £20bn loss eats two-thirds of the investors’ cushion. The Decider says hold off.",
    "lesson": "The result depends on the perspective and assumptions. A public decision also needs environmental, legal and distributional considerations.",
    "change": "Raise confidence from 60% to 65%, or credibly reduce the possible loss to £15bn, and the answer becomes Yes.",
    "shortChange": "Raise confidence from 60% to 65%, or credibly reduce the possible loss to £15bn, and the answer becomes Yes.",
    "variant": {
      "p": 65,
      "expected": true
    },
    "expected": false,
    "importance": "Pretty important",
    "currency": "GBP",
    "perspective": "Investor decision: commit to construction",
    "basis": "Heathrow’s proposal describes a £49bn expansion and modernisation programme. The four outcomes, 60% probability and £30bn resources here are example assumptions, not Heathrow forecasts. The model’s probability threshold is about 61.3%; it is not a forecast of success. A construction commitment also needs a cash-flow and financing assessment.",
    "sources": [
      {
        "label": "Heathrow’s published expansion proposal",
        "url": "https://www.heathrow.com/content/dam/heathrow/web/common/documents/expansion/expanding-heathrow-proposal-summary.pdf"
      },
      {
        "label": "IAG-commissioned Oliver Wyman affordability analysis (on CAA website)",
        "url": "https://www.caa.co.uk/media/itmddfgj/20260311-oliver-wyman-report-heathrow-affordable-expansion.pdf"
      }
    ]
  },
  {
    "id": "nuclear-investment",
    "category": "public",
    "kind": "money",
    "question": "Should we back a new nuclear power station?",
    "teaser": "Dependable power still needs dependable project economics.",
    "person": "The decision team",
    "period": "Long-term project outcomes, valued consistently in today’s money",
    "story": "A consortium considers investing in a nuclear project rather than retaining its existing energy investments. This example explores financial exposure, not whether nuclear power is right for the country.",
    "situations": [
      "Power-market conditions and delivery support the investment",
      "Costs, delays or power-market conditions disappoint"
    ],
    "pay": {
      "A": 600000000.0,
      "B": -400000000.0,
      "C": -250000000.0,
      "D": -50000000.0
    },
    "p": 70,
    "resources": 1000000000.0,
    "notes": {
      "A": "Net gain after project costs",
      "B": "Net loss after costs and remaining asset value",
      "C": "Existing investments lose value in a market favouring dependable new supply",
      "D": "Existing investments suffer a smaller decline"
    },
    "why": "At these odds, the project’s potential value justifies the downside relative to the investors’ resources.",
    "shortWhy": "Big project. Big risks. But these odds and resources give the investment enough room to work. The Decider says back it.",
    "lesson": "The result depends on the perspective and assumptions. A public decision also needs environmental, legal and distributional considerations.",
    "change": "Reduce confidence in the favourable scenario from 70% to 30%, and the answer becomes No.",
    "shortChange": "Reduce confidence in the favourable scenario from 70% to 30%, and the answer becomes No.",
    "variant": {
      "p": 30,
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "perspective": "Investor decision: finance a power project",
    "basis": "A generic project example. All amounts, odds and resources are assumed; none describe a named nuclear scheme. Safety, waste, consent and construction liquidity require separate assessment.",
    "sources": []
  },
  {
    "id": "stadium-funding",
    "category": "public",
    "kind": "money",
    "question": "Should a council help fund a new stadium?",
    "teaser": "A landmark project—or an expensive commitment?",
    "person": "The decision team",
    "period": "Long-term project outcomes, valued consistently in today’s money",
    "story": "A council considers a stadium contribution. The model compares net financial outcomes for the council; wider community benefits and who receives them need separate consideration.",
    "situations": [
      "Demand and local commercial activity are strong",
      "Attendance and commercial activity disappoint"
    ],
    "pay": {
      "A": 40000000.0,
      "B": -70000000.0,
      "C": -10000000.0,
      "D": 0
    },
    "p": 60,
    "resources": 100000000.0,
    "notes": {
      "A": "Net financial benefit after the contribution and ongoing costs",
      "B": "Loss including the contribution and further obligations",
      "C": "Existing council income declines as activity moves elsewhere",
      "D": "No material change to council finances"
    },
    "why": "The possible loss would consume too much of the council’s assumed financial capacity, despite the hoped-for gain.",
    "shortWhy": "A shiny stadium. A very un-shiny bill if it flops. The Decider says this deal asks too much of the council.",
    "lesson": "The result depends on the perspective and assumptions. A public decision also needs environmental, legal and distributional considerations.",
    "change": "If credible protections reduce the council’s bad-outcome loss from £70m to £25m, the answer becomes Yes.",
    "shortChange": "If credible protections reduce the council’s bad-outcome loss from £70m to £25m, the answer becomes Yes.",
    "variant": {
      "pay": {
        "B": -25000000.0
      },
      "expected": true
    },
    "expected": false,
    "importance": "Pretty important",
    "currency": "GBP",
    "perspective": "Council decision: a financial contribution",
    "basis": "A generic council example with assumed numbers. The £100m represents an explicitly assumed risk-bearing financial base, not a real council’s cash or unrestricted reserves. Statutory duties, borrowing rules and service protection can prevent an investment regardless of this result.",
    "sources": []
  },
  {
    "id": "flood-defences",
    "category": "public",
    "kind": "money",
    "question": "Should our city invest in flood defences?",
    "teaser": "Doing nothing carries a cost too.",
    "person": "The decision team",
    "period": "Long-term project outcomes, valued consistently in today’s money",
    "story": "A local authority compares funding flood defences with leaving the current protection in place. The figures concern the authority’s own net financial exposure; resident safety and wider losses need a separate assessment.",
    "situations": [
      "A damaging flood occurs and protection has value",
      "No damaging flood occurs during the appraisal period"
    ],
    "pay": {
      "A": -10000000.0,
      "B": -15000000.0,
      "C": -60000000.0,
      "D": 0
    },
    "p": 35,
    "resources": 100000000.0,
    "notes": {
      "A": "Protection costs and residual flood losses",
      "B": "Protection costs with no flood losses",
      "C": "Flood-related financial losses without new protection",
      "D": "No flood and no new protection costs"
    },
    "why": "Protection costs money even without a flood. Here, reducing the authority’s large flood exposure makes that cost worthwhile.",
    "shortWhy": "Nobody cheers for a flood-defence bill. But the possible bill without protection is much worse. The Decider says build.",
    "lesson": "The result depends on the perspective and assumptions. A public decision also needs environmental, legal and distributional considerations.",
    "change": "Reduce the chance of a damaging flood over the whole appraisal period from 35% to 5%, and the answer becomes No on these financial inputs.",
    "shortChange": "Reduce the chance of a damaging flood over the whole appraisal period from 35% to 5%, and the answer becomes No on these financial inputs.",
    "variant": {
      "p": 5,
      "expected": false
    },
    "expected": true,
    "importance": "Pretty important",
    "currency": "GBP",
    "perspective": "Local authority decision: financial protection",
    "basis": "A generic financial example with assumed figures and no named city or engineering forecast. The 35% is a whole-period probability, not an annual risk. “As hoped” here identifies the state favouring the investment, not a wish for flooding. Engineering failure, lives, displacement and other public duties require further assessment.",
    "sources": [],
    "scenarioLabels": [
      "Flood during the period",
      "No flood during the period"
    ]
  },
  {
    "id": "phone-warranty",
    "category": "money",
    "kind": "money",
    "question": "Should I pay for an extended warranty on my phone?",
    "teaser": "The phone is expensive. Does that make the extra cover worth it?",
    "person": "Alex",
    "period": "The two-year extended-cover period",
    "story": "Alex is offered two years of extra phone cover for £180, plus a £50 claim fee if a covered fault happens. Without it, the assumed repair or replacement bill is £900. Alex compares buying the cover with paying any eligible bill personally.",
    "situations": [
      "The phone has no covered fault during the period",
      "A covered fault means a £900 repair or replacement bill"
    ],
    "pay": {
      "A": -180,
      "B": -230,
      "C": 0,
      "D": -900
    },
    "p": 90,
    "resources": 1500,
    "notes": {
      "A": "£180 premium, with no claim",
      "B": "£180 premium plus a £50 claim fee",
      "C": "No premium and no repair bill",
      "D": "£900 paid personally for repair or replacement"
    },
    "why": "At a 10% chance of a covered fault over two years and £1,500 of resources, the protection is too expensive for the risk transferred.",
    "shortWhy": "An expensive phone doesn’t automatically need expensive cover. At this price and these odds, The Decider says keep the £180.",
    "lesson": "The value of cover depends on the bill it actually removes, its price, the chance of claiming and your ability to pay the bill yourself.",
    "change": "Raise the chance of a covered fault over the two years from 10% to 30%, keeping everything else the same, and the answer becomes Yes.",
    "shortChange": "Think a covered fault is 30% likely rather than 10% over two years? The Decider switches to Yes.",
    "variant": {
      "p": 70,
      "expected": true
    },
    "expected": false,
    "importance": "Everyday",
    "currency": "GBP",
    "perspective": "Personal money choice",
    "basis": "Prices, claim fees and probabilities are example inputs, not a named warranty offer or a reliability forecast. Count only the repair cost you would personally pay after any existing cover. Check which faults the extra policy actually covers."
  }
];
function stateFor(e,variation=false){
 const patch=variation?e.variant:{};
 const pay={...e.pay,...(patch.pay||{})};
 const resources=patch.resources??e.resources;
 return {kind:e.kind,title:e.question,mode:pay.C===pay.D?'simplified':'normal',importance:e.importance,currency:e.currency,p:patch.p??e.p,pay,resources,limit:resources,capacity:resources,ruinGo:false,ruinStay:false,uncertain:false};
}
function choose(previous=[],random=Math.random,category='all'){
 const shuffle=pool=>{pool=[...pool];for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}return pool;};
 const draw=(kind,n)=>{const pool=items.filter(e=>e.category===kind);return [...shuffle(pool.filter(e=>!previous.includes(e.id))),...shuffle(pool.filter(e=>previous.includes(e.id)))].slice(0,n);};
 if(category!=='all'&&items.some(e=>e.category===category))return draw(category,4);
 return [...draw('public',1),...draw('business',1),...draw('money',1),...draw('happiness',1)];
}
const api={items,stateFor,choose};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
root.DeciderExamples=api;
})(typeof globalThis!=='undefined'?globalThis:this);
