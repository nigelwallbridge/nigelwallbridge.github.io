// Dynamic labelling only. The shared calculation and numerical scales remain unchanged.
(function(root){
const configs={
  "advertising": {
    "go": "run the campaign",
    "stay": "don’t buy the new advertising",
    "yes": "Run the campaign.",
    "no": "Keep the current plan.",
    "questions": {
      "A": "If I run the advertising campaign and demand increases a lot…",
      "B": "If I run the campaign and the response is weak…",
      "C": "If I keep the current plan, though the campaign would draw strong demand…",
      "D": "If I keep the current plan and the campaign would draw weak demand…"
    },
    "simpleQuestion": "If I don’t run the additional advertising campaign…",
    "probabilityQuestion": "How likely is it that there will be a strong customer response if I run the campaign?",
    "event": "customers responding strongly",
    "scenarios": [
      "customers respond strongly",
      "customer demand disappoints"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money does the business have in reserve before this campaign?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "Next three months",
    "probabilityLabels": [
      "Strong demand",
      "Weak demand"
    ]
  },
  "first-employee": {
    "go": "hire my first employee",
    "stay": "keep working solo",
    "yes": "Go ahead. Make the hire.",
    "no": "Stay solo for now.",
    "questions": {
      "A": "If I hire someone and the increase in customer demand continues…",
      "B": "If I hire and customer demand falls short…",
      "C": "If I stay solo and customer demand stays strong…",
      "D": "If I stay solo and client demand falls short…"
    },
    "simpleQuestion": "If I keep working solo…",
    "probabilityQuestion": "How likely is client demand to stay strong?",
    "event": "client demand staying strong",
    "scenarios": [
      "customer demand stays strong",
      "customer demand falls short"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money does my business have in reserve before hiring?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "First twelve months",
    "probabilityLabels": [
      "Strong client demand",
      "Demand falls short"
    ]
  },
  "new-product": {
    "go": "launch the product",
    "stay": "stick with my existing products",
    "yes": "Launch the product.",
    "no": "Hold off on the launch.",
    "questions": {
      "A": "If I launch and the market responds well, the additional profit will be…",
      "B": "If I launch and the market response disappoints…",
      "C": "If I keep existing products, though the launch would go well…",
      "D": "If I keep existing products and the launch would disappoint…"
    },
    "simpleQuestion": "If I stick with my existing products…",
    "probabilityQuestion": "How likely is a good response if I launch the new product?",
    "event": "a strong market response",
    "scenarios": [
      "the market responds well",
      "the market response disappoints"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money does my business have in reserve before the launch?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "First six months",
    "probabilityLabels": [
      "Strong market response",
      "Disappointing response"
    ]
  },
  "large-order": {
    "go": "accept the order",
    "stay": "turn down the order",
    "yes": "Take the order.",
    "no": "Turn down this order.",
    "questions": {
      "A": "If I accept the order and delivery and payment go smoothly…",
      "B": "If I accept it and something, perhaps delivery or payment, goes wrong…",
      "C": "If I decline, though delivery and payment would go smoothly…",
      "D": "If I decline and delivery or payment would go wrong…"
    },
    "simpleQuestion": "If I turn down the order…",
    "probabilityQuestion": "How likely is it that everything would go well with this large order?",
    "event": "smooth delivery and full payment",
    "scenarios": [
      "delivery and payment would go smoothly",
      "delivery or payment would go wrong"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money does my business have in reserve before taking the order?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "Through delivery and payment",
    "probabilityLabels": [
      "Smooth delivery and payment",
      "Delivery or payment problems"
    ]
  },
  "equipment": {
    "go": "buy the new equipment",
    "stay": "keep the old equipment",
    "yes": "Buy the equipment.",
    "no": "Keep the existing equipment.",
    "questions": {
      "A": "If I buy the equipment and there is work for it…",
      "B": "If I buy the equipment and there is insufficient demand for it…",
      "C": "If I don’t buy new and demand is strong…",
      "D": "If I don’t buy new and demand is weak…"
    },
    "simpleQuestion": "If I keep the old equipment…",
    "probabilityQuestion": "How likely is demand to justify the extra capacity?",
    "event": "demand justifying the extra capacity",
    "scenarios": [
      "demand makes use of the extra capacity",
      "demand stays weak"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money does my business have in reserve before buying the equipment?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "Next twelve months",
    "probabilityLabels": [
      "Demand justifies extra capacity",
      "Weak demand"
    ]
  },
  "training-course": {
    "go": "pay for the course",
    "stay": "skip the course",
    "yes": "Take the course.",
    "no": "Skip this course.",
    "questions": {
      "A": "If I take the course and it leads to a better paid job…",
      "B": "If I take the course and a better paid job doesn’t arrive…",
      "C": "If I skip the course, though that opportunity would arrive…",
      "D": "If I skip the course and find that those better paid jobs aren’t really there…"
    },
    "simpleQuestion": "If I skip the course…",
    "probabilityQuestion": "How likely is the better-paid job within the year?",
    "event": "the better-paid opportunity arriving within the year",
    "scenarios": [
      "the better-paid opportunity arrives",
      "that opportunity does not arrive in time"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money do I have before paying for the course?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "Next twelve months",
    "probabilityLabels": [
      "Opportunity arrives in time",
      "No opportunity in time"
    ]
  },
  "lottery-ticket": {
    "go": "buy the ticket",
    "stay": "keep my ticket money",
    "yes": "Buy the ticket.",
    "no": "Keep the ticket money.",
    "questions": {
      "A": "If I buy a ticket and my numbers win…",
      "B": "If I buy a ticket and my numbers don’t win…",
      "C": "If I skip the ticket and my favourite lucky numbers win…",
      "D": "If I skip the ticket and my numbers don’t win…"
    },
    "simpleQuestion": "If I keep my ticket money…",
    "probabilityQuestion": "How likely are my chosen numbers to win?",
    "event": "my chosen numbers winning",
    "scenarios": [
      "my chosen numbers win",
      "my chosen numbers do not win"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money do I have before buying the ticket?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "Until the draw is settled",
    "probabilityLabels": [
      "My numbers win",
      "My numbers do not win"
    ]
  },
  "repair-or-replace": {
    "go": "replace the car",
    "stay": "repair my current car",
    "yes": "Replace the car.",
    "no": "Repair the current car.",
    "questions": {
      "A": "If I replace my car and motoring goes smoothly…",
      "B": "If I replace my car and expensive problems still occur…",
      "C": "If I repair my old car and motoring goes smoothly…",
      "D": "If I repair my old car and expensive problems occur…"
    },
    "simpleQuestion": "If I repair my current car…",
    "probabilityQuestion": "How likely is a smooth year of motoring without serious problems?",
    "event": "a smooth year of motoring",
    "scenarios": [
      "the year’s motoring goes smoothly",
      "the year brings expensive problems"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money do I have before either car option?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "Next twelve months",
    "probabilityLabels": [
      "Smooth motoring",
      "Expensive problems"
    ]
  },
  "performance-bonus": {
    "go": "take the bonus-based job",
    "stay": "stay in my guaranteed-pay job",
    "yes": "Take the bonus-based job.",
    "no": "Stay in the guaranteed-pay job.",
    "questions": {
      "A": "If I take the bonus job and earn the hoped-for bonus…",
      "B": "If I take the bonus job and performance falls short…",
      "C": "If I stay in my guaranteed-pay job, though I would earn the bonus…",
      "D": "If I stay in my guaranteed-pay job and I would miss the bonus…"
    },
    "simpleQuestion": "If I stay in my guaranteed-pay job…",
    "probabilityQuestion": "How likely am I to earn the hoped-for bonus if I take that job?",
    "event": "earning the hoped-for bonus",
    "scenarios": [
      "performance earns the hoped-for bonus",
      "performance falls short"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money do I have in reserve before this job decision?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "Next twelve months",
    "probabilityLabels": [
      "Hoped-for bonus earned",
      "Performance falls short"
    ]
  },
  "refundable-booking": {
    "go": "buy the refundable booking",
    "stay": "buy the non-refundable booking",
    "yes": "Choose the refundable booking.",
    "no": "Choose the non-refundable booking.",
    "questions": {
      "A": "If I book refundable and the trip goes ahead…",
      "B": "If I book refundable and the trip is cancelled…",
      "C": "If I book non-refundable and the trip goes ahead…",
      "D": "If I book non-refundable and the trip is cancelled…"
    },
    "simpleQuestion": "If I buy the non-refundable booking…",
    "probabilityQuestion": "How likely is the trip to go ahead?",
    "event": "the trip going ahead",
    "scenarios": [
      "the trip goes ahead",
      "the trip has to be cancelled"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money do I have before making the booking?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "Until the trip ends or is cancelled",
    "probabilityLabels": [
      "Trip goes ahead",
      "Trip cancelled"
    ]
  },
  "ask-someone-out": {
    "go": "ask them out",
    "stay": "leave it unasked",
    "yes": "Ask them out.",
    "no": "Leave it for now.",
    "questions": {
      "A": "If I ask them out and they say yes…",
      "B": "If I ask them out and they say no…",
      "C": "If I don’t ask but later find out that they would have said yes if I had asked…",
      "D": "If I don’t ask and find out that they would have said no anyway…"
    },
    "simpleQuestion": "If I leave it unasked…",
    "probabilityQuestion": "How likely are they to say yes?",
    "event": "them saying yes if asked",
    "scenarios": [
      "they would say yes",
      "they would say no"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much emotional strength do I have for this right now?",
    "resourceShort": "Emotional strength before this choice",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "feelingEnds": {
      "go": [
        "Really regret asking",
        "Delighted I asked"
      ],
      "stay": [
        "Really regret not asking",
        "Glad I left it"
      ]
    },
    "actor": "I",
    "displayPeriod": "Next few weeks",
    "probabilityLabels": [
      "They would say yes",
      "They would say no"
    ]
  },
  "new-city": {
    "go": "move to the new city",
    "stay": "stay where I am",
    "yes": "Make the move.",
    "no": "Stay where you are for now.",
    "questions": {
      "A": "If I move and life in the new place really suits me…",
      "B": "If I move and life there feels wrong…",
      "C": "If I stay here, even though life in the new place would have suited me…",
      "D": "If I stay here and realise that life there would not suit me…"
    },
    "simpleQuestion": "If I stay where I am…",
    "probabilityQuestion": "How likely is life in the new city to suit me?",
    "event": "the new city being a good fit",
    "scenarios": [
      "life in the new city would suit me",
      "life there would not suit me"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much emotional strength do I have before a possible move?",
    "resourceShort": "Emotional strength before this choice",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "feelingEnds": {
      "go": [
        "Really regret moving",
        "Delighted I moved"
      ],
      "stay": [
        "Really regret staying",
        "Happy where I am"
      ]
    },
    "actor": "I",
    "displayPeriod": "First year after the possible move",
    "probabilityLabels": [
      "New city suits me",
      "New city feels wrong"
    ]
  },
  "difficult-conversation": {
    "go": "have the conversation",
    "stay": "leave the subject alone",
    "yes": "Have the conversation.",
    "no": "Leave the subject for now.",
    "questions": {
      "A": "If I speak up and my friend is open to a discussion…",
      "B": "If I speak up and my friend is hostile or hurt…",
      "C": "If I stay quiet, though my friend would be receptive…",
      "D": "If I stay quiet and my friend would not be receptive…"
    },
    "simpleQuestion": "If I leave the subject alone…",
    "probabilityQuestion": "How likely is my friend to be receptive?",
    "event": "my friend being open to discussion",
    "scenarios": [
      "my friend is open to discussion",
      "my friend is hostile or hurt"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much emotional strength do I have for this conversation?",
    "resourceShort": "Emotional strength before this choice",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "feelingEnds": {
      "go": [
        "Really regret speaking up",
        "Glad I spoke up"
      ],
      "stay": [
        "Really regret keeping quiet",
        "Glad I left it alone"
      ]
    },
    "actor": "I",
    "displayPeriod": "Following month",
    "probabilityLabels": [
      "Open to discussion",
      "Hostile or hurt"
    ]
  },
  "new-hobby": {
    "go": "try the class",
    "stay": "give the class a miss",
    "yes": "Give the class a go.",
    "no": "Give this class a miss.",
    "questions": {
      "A": "If I try the class and I love it…",
      "B": "If I try the class and it’s not for me…",
      "C": "If I skip the class, though it would suit me…",
      "D": "If I don’t try and it turns out it’s not my kind of thing…"
    },
    "simpleQuestion": "If I give the class a miss…",
    "probabilityQuestion": "How likely is this class to be good for me?",
    "event": "the class being a good fit",
    "scenarios": [
      "the class is right for me",
      "the class is not for me"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much emotional strength do I have before trying something new?",
    "resourceShort": "Emotional strength before this choice",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "feelingEnds": {
      "go": [
        "Really regret trying it",
        "Delighted I tried it"
      ],
      "stay": [
        "Really regret missing it",
        "Glad I skipped it"
      ]
    },
    "actor": "I",
    "displayPeriod": "First four sessions",
    "probabilityLabels": [
      "Class suits me",
      "Class does not suit me"
    ]
  },
  "competition": {
    "go": "enter the competition",
    "stay": "sit this competition out",
    "yes": "Enter the competition.",
    "no": "Sit this one out.",
    "questions": {
      "A": "If I enter and get the response I hope for…",
      "B": "If I enter and do not get that response…",
      "C": "If I sit it out, though my entry would get that response…",
      "D": "If I sit it out and my entry would not get that response…"
    },
    "simpleQuestion": "If I sit this competition out…",
    "probabilityQuestion": "How likely is my entry to get the response I hope for?",
    "event": "getting the response I hope for",
    "scenarios": [
      "my entry would get the response I hope for",
      "my entry would not get that response"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much emotional strength do I have before entering?",
    "resourceShort": "Emotional strength before this choice",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "feelingEnds": {
      "go": [
        "Really regret entering",
        "Delighted I entered"
      ],
      "stay": [
        "Really regret missing out",
        "Glad I sat it out"
      ]
    },
    "actor": "I",
    "displayPeriod": "Event and following week",
    "probabilityLabels": [
      "Hoped-for response",
      "Response falls short"
    ]
  },
  "challenging-role": {
    "go": "lead the project",
    "stay": "take the smaller familiar role",
    "yes": "Lead the project.",
    "no": "Take the smaller role.",
    "questions": {
      "A": "If I lead and support and relationships are good…",
      "B": "If I lead and support and relationships are difficult…",
      "C": "If I take the smaller role, though leading would bring good support…",
      "D": "If I take the smaller role and leading would be harder than hoped…"
    },
    "simpleQuestion": "If I take the smaller familiar role…",
    "probabilityQuestion": "How likely are good support and working relationships if I lead?",
    "event": "good support and working relationships",
    "scenarios": [
      "the support and working relationships are good",
      "the support and working relationships are difficult"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much emotional strength do I have before taking this on?",
    "resourceShort": "Emotional strength before this choice",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "feelingEnds": {
      "go": [
        "Really regret leading it",
        "Delighted I led it"
      ],
      "stay": [
        "Really regret declining",
        "Happy in the smaller role"
      ]
    },
    "actor": "I",
    "displayPeriod": "First three months",
    "probabilityLabels": [
      "Good support and relationships",
      "Difficult support and relationships"
    ]
  },
  "old-friend": {
    "go": "send the message",
    "stay": "leave the message unsent",
    "yes": "Send the message.",
    "no": "Leave the message for now.",
    "questions": {
      "A": "If I message and my old friend welcomes contact…",
      "B": "If I message and my old friend does not respond warmly…",
      "C": "If I stay silent, though my friend would welcome contact…",
      "D": "If I stay silent and my friend would not respond warmly…"
    },
    "simpleQuestion": "If I leave the message unsent…",
    "probabilityQuestion": "How likely is my friend to welcome the message?",
    "event": "my friend welcoming the message",
    "scenarios": [
      "my friend would welcome contact",
      "my friend would not respond warmly"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much emotional strength do I have before reaching out?",
    "resourceShort": "Emotional strength before this choice",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "feelingEnds": {
      "go": [
        "Really regret messaging",
        "Delighted I reached out"
      ],
      "stay": [
        "Really regret staying silent",
        "Glad I left it"
      ]
    },
    "actor": "I",
    "displayPeriod": "Next few weeks",
    "probabilityLabels": [
      "Contact welcomed",
      "No warm response"
    ]
  },
  "perform-in-public": {
    "go": "perform at the evening",
    "stay": "skip the performance",
    "yes": "Step up and perform.",
    "no": "Skip this performance.",
    "questions": {
      "A": "If I perform and the evening goes well…",
      "B": "If I perform and the evening is embarrassing…",
      "C": "If I skip performing, though the evening would feel encouraging…",
      "D": "If I skip performing and the evening would feel uncomfortable…"
    },
    "simpleQuestion": "If I skip the performance…",
    "probabilityQuestion": "How likely is the evening to be a positive one for me?",
    "event": "the evening going well for me",
    "scenarios": [
      "the evening goes well for me",
      "the evening is embarrassing"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much emotional strength do I have before performing?",
    "resourceShort": "Emotional strength before this choice",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "feelingEnds": {
      "go": [
        "Really regret performing",
        "Delighted I performed"
      ],
      "stay": [
        "Really regret missing it",
        "Glad I skipped it"
      ]
    },
    "actor": "I",
    "displayPeriod": "Performance and following week",
    "probabilityLabels": [
      "Evening goes well",
      "Embarrassing evening"
    ]
  },
  "organise-gathering": {
    "go": "host the gathering",
    "stay": "have a quiet evening instead",
    "yes": "Host the gathering.",
    "no": "Choose the quiet evening.",
    "questions": {
      "A": "If I host and the gathering is enjoyable…",
      "B": "If I host and the gathering disappoints…",
      "C": "If I choose a quiet evening, though the gathering would have been enjoyable…",
      "D": "If I choose a quiet evening and the its likely gathering would not have gone well…"
    },
    "simpleQuestion": "If I have a quiet evening instead…",
    "probabilityQuestion": "How likely is the gathering to be enjoyable?",
    "event": "an enjoyable gathering",
    "scenarios": [
      "the gathering would be enjoyable",
      "the gathering would be disappointing"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much emotional strength do I have before organising this?",
    "resourceShort": "Emotional strength before this choice",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "feelingEnds": {
      "go": [
        "Really regret hosting",
        "Delighted I hosted"
      ],
      "stay": [
        "Really regret not hosting",
        "Happy with a quiet night"
      ]
    },
    "actor": "I",
    "displayPeriod": "Planning, evening and following day",
    "probabilityLabels": [
      "Enjoyable gathering",
      "Disappointing gathering"
    ]
  },
  "solo-trip": {
    "go": "take the solo trip",
    "stay": "stay home",
    "yes": "Take the solo trip.",
    "no": "Stay home for now.",
    "questions": {
      "A": "If I travel alone and it suits me…",
      "B": "If I travel alone and it does not suit me…",
      "C": "If I stay home, though travelling alone would suit me…",
      "D": "If I stay home and travelling alone would not suit me…"
    },
    "simpleQuestion": "If I stay home…",
    "probabilityQuestion": "How likely is this solo trip to suit me?",
    "event": "the solo experience suiting me",
    "scenarios": [
      "the solo experience would suit me",
      "the solo experience would not suit me"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much emotional strength do I have before travelling alone?",
    "resourceShort": "Emotional strength before this choice",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "feelingEnds": {
      "go": [
        "Really regret going",
        "Delighted I went"
      ],
      "stay": [
        "Really regret staying home",
        "Happy I stayed home"
      ]
    },
    "actor": "I",
    "displayPeriod": "Trip and first week back",
    "probabilityLabels": [
      "Solo travel suits me",
      "Solo travel does not suit me"
    ]
  },
  "heathrow-third-runway": {
    "go": "commit to building the third runway",
    "stay": "retain the existing airport business",
    "yes": "Commit to construction.",
    "no": "Hold off on construction.",
    "questions": {
      "A": "If we build and demand, charges and delivery support expansion…",
      "B": "If we build and commercial performance or delivery disappoints…",
      "C": "If we keep the existing airport, though expansion would succeed…",
      "D": "If we keep the existing airport and expansion would disappoint…"
    },
    "simpleQuestion": "If we retain the existing airport business…",
    "probabilityQuestion": "How likely are demand, charges and delivery to support expansion?",
    "event": "demand, charges and delivery supporting expansion",
    "scenarios": [
      "demand, charges and delivery support expansion",
      "commercial performance or delivery disappoints"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "What starting financial resources do the investors have?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "we",
    "displayPeriod": "Long-term · Today’s money",
    "probabilityLabels": [
      "Conditions support expansion",
      "Performance or delivery disappoints"
    ]
  },
  "nuclear-investment": {
    "go": "finance the new power station",
    "stay": "retain the existing energy investments",
    "yes": "Back the power project.",
    "no": "Keep the existing investments.",
    "questions": {
      "A": "If we invest and market conditions and delivery support the project…",
      "B": "If we invest and costs, delays or market conditions disappoint…",
      "C": "If we keep existing investments, though the project would succeed…",
      "D": "If we keep existing investments and the project would disappoint…"
    },
    "simpleQuestion": "If we retain the existing energy investments…",
    "probabilityQuestion": "How likely are market conditions and delivery to support the project?",
    "event": "market conditions and delivery supporting the project",
    "scenarios": [
      "power-market conditions and delivery support the project",
      "costs, delays or power-market conditions disappoint"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "What starting financial resources does the consortium have?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "we",
    "displayPeriod": "Long-term · Today’s money",
    "probabilityLabels": [
      "Conditions support the project",
      "Costs, delays or market disappoint"
    ]
  },
  "stadium-funding": {
    "go": "fund the stadium",
    "stay": "decline the stadium contribution",
    "yes": "Back the stadium deal.",
    "no": "Pass on this stadium deal.",
    "questions": {
      "A": "If we fund the stadium and attendance and local trade are strong…",
      "B": "If we fund the stadium and attendance and trade disappoint…",
      "C": "If we decline, though the stadium would draw strong attendance and trade…",
      "D": "If we decline and the stadium would disappoint…"
    },
    "simpleQuestion": "If we decline the stadium contribution…",
    "probabilityQuestion": "How likely are strong attendance and commercial activity if the stadium is built?",
    "event": "strong attendance and local commercial activity",
    "scenarios": [
      "attendance and local commercial activity are strong",
      "attendance and commercial activity disappoint"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "What financial resources can the council genuinely draw on?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "we",
    "displayPeriod": "Long-term · Today’s money",
    "probabilityLabels": [
      "Strong attendance and local trade",
      "Attendance and trade disappoint"
    ]
  },
  "flood-defences": {
    "go": "fund the flood defences",
    "stay": "keep the current flood protection",
    "yes": "Build the flood defences.",
    "no": "Keep the current protection.",
    "questions": {
      "A": "If we build defences and a damaging flood occurs…",
      "B": "If we build defences and no damaging flood occurs…",
      "C": "If we keep current protection and a damaging flood occurs…",
      "D": "If we keep current protection and no damaging flood occurs…"
    },
    "simpleQuestion": "If we keep the current flood protection…",
    "probabilityQuestion": "How likely is a damaging flood over the whole appraisal period?",
    "event": "a damaging flood during the whole appraisal period",
    "scenarios": [
      "a damaging flood occurs during the appraisal period",
      "no damaging flood occurs during that period"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "What financial resources can the authority genuinely draw on?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "we",
    "displayPeriod": "Whole long-term appraisal · Today’s money",
    "probabilityLabels": [
      "Damaging flood during the period",
      "No damaging flood during the period"
    ]
  },
  "phone-warranty": {
    "go": "buy the extended cover",
    "stay": "skip the extended cover",
    "yes": "Buy the extra cover.",
    "no": "Skip the extra cover.",
    "questions": {
      "A": "If I buy the insurance and don’t need it…",
      "B": "If I buy cover, there’s a problem and the insurance pays for it…",
      "C": "If I don’t buy the insurance and don’t need it…",
      "D": "If I skip cover and have to pay personally for a problem…"
    },
    "simpleQuestion": "If I skip the extended cover…",
    "probabilityQuestion": "How likely is my phone to avoid a covered fault over the two years?",
    "event": "no covered fault over the two years",
    "scenarios": [
      "my phone has no covered fault over the two years",
      "my phone develops a covered fault in that period"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money do I have in reserve before paying for the insurance?",
    "resourceShort": "Starting financial resources",
    "choiceFor": {
      "A": "go",
      "B": "go",
      "C": "stay",
      "D": "stay"
    },
    "scenarioFor": {
      "A": 0,
      "B": 1,
      "C": 0,
      "D": 1
    },
    "moneyEnds": [
      "Down",
      "Up"
    ],
    "actor": "I",
    "displayPeriod": "Two-year period",
    "probabilityLabels": [
      "No covered fault",
      "Covered fault"
    ]
  }
};
function forState(d){return configs[d?.templateId||d?.exampleId||d?.exampleQuestion]||null;}
function question(d,key){const c=forState(d);return c?(key==='C'&&d.mode==='simplified'?c.simpleQuestion:c.questions[key]):null;}
function headline(d,go){const c=forState(d);return c?(go?c.yes:c.no):null;}
function summary(d,r){const c=forState(d);if(!c)return null;
 const goBad=r.comparison.badGo,stayBad=r.comparison.badStay;
 const selected=r.goForIt?c.go:c.stay;
 if(goBad&&stayBad)return 'Both choices include a possible outcome that would use up the '+(d.kind==='money'?'starting financial resources':'emotional strength')+' you entered. Look for a different way forward.';
 if(goBad)return 'One possible outcome if you '+c.go+' would use up the '+(d.kind==='money'?'starting financial resources':'emotional strength')+' you entered. The Decider favours the alternative: '+c.stay+'.';
 if(stayBad)return 'One possible outcome if you '+c.stay+' would use up the '+(d.kind==='money'?'starting financial resources':'emotional strength')+' you entered. The Decider favours the alternative: '+c.go+'.';
 if(!r.comparisonResolved)return 'The answers for “'+c.go+'” and “'+c.stay+'” are too close for a reliable numerical comparison.';
 if(r.comparison.exactTie)return 'Your answers leave “'+c.go+'” and “'+c.stay+'” evenly balanced.';
 const probability=new Intl.NumberFormat('en-GB',{maximumFractionDigits:7}).format(d.p)+'%';
 const chance='You put “'+c.probabilityLabels[0]+'” at '+probability+'. ';
 const possible=d.p===0?[1]:d.p===100?[0]:[0,1];
 const go=[d.pay.A,d.pay.B],stay=[d.pay.C,d.pay.D];
 const selectedValues=r.goForIt?go:stay,otherValues=r.goForIt?stay:go;
 const dominates=possible.every(i=>selectedValues[i]>=otherValues[i]);
 if(dominates)return 'The Decider favours “'+selected+'”. Its consequences are at least as good in every scenario you give a chance of happening. Changing your starting resources alone will not reverse that ordering.';
 if(d.kind==='happiness')return 'The Decider favours “'+selected+'”. '+chance+'The comparison weighs the possible happiness and unhappiness against your emotional strength. A difficult outcome weighs more heavily when you have less to draw on.';
 const amount=n=>new Intl.NumberFormat('en-GB',{style:'currency',currency:d.currency,maximumFractionDigits:2}).format(Math.abs(n));
 const outcome=n=>n===0?'no change':n<0?'a loss of '+amount(n):'a gain of '+amount(n);
 const low=Math.min(...possible.map(i=>selectedValues[i])),high=Math.max(...possible.map(i=>selectedValues[i]));
 const averageGo=d.p/100*d.pay.A+(1-d.p/100)*d.pay.B;
 const averageStay=d.p/100*d.pay.C+(1-d.p/100)*d.pay.D;
 const averageDisagrees=r.goForIt?averageGo<averageStay:averageStay<averageGo;
 return 'The Decider favours “'+selected+'”. '+chance+'This choice ranges from '+outcome(low)+' to '+outcome(high)+', against '+amount(d.resources)+' of starting resources. '+(averageDisagrees?'The other choice has a higher average money outcome, but the significance of losses relative to your resources reverses the preference under this rule.':'The rule weighs those gains and losses in proportion to your starting resources.');
}
const api={configs,forState,question,headline,summary};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.DeciderLabels=api;
})(typeof globalThis!=='undefined'?globalThis:this);
