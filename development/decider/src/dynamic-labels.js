// Dynamic labelling only. The shared calculation and numerical scales remain unchanged.
(function(root){
const configs={
  "advertising": {
    "go": "run the campaign",
    "stay": "keep my current marketing plan",
    "yes": "Run the campaign.",
    "no": "Keep the current plan.",
    "questions": {
      "A": "If I run the campaign and customers respond strongly…",
      "B": "If I run the campaign and customer demand disappoints…",
      "C": "If I keep my current marketing plan and customers respond strongly…",
      "D": "If I keep my current marketing plan and customer demand disappoints…"
    },
    "simpleQuestion": "If I keep my current marketing plan…",
    "probabilityQuestion": "How likely is a strong customer response?",
    "event": "customers responding strongly",
    "scenarios": [
      "customers respond strongly",
      "customer demand disappoints"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money does my business have before this campaign?",
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
    "actor": "I"
  },
  "first-employee": {
    "go": "hire my first employee",
    "stay": "keep working solo",
    "yes": "Make the hire.",
    "no": "Stay solo for now.",
    "questions": {
      "A": "If I hire my first employee and client demand stays strong…",
      "B": "If I hire my first employee and client demand falls short…",
      "C": "If I keep working solo and client demand stays strong…",
      "D": "If I keep working solo and client demand falls short…"
    },
    "simpleQuestion": "If I keep working solo…",
    "probabilityQuestion": "How likely is client demand to stay strong?",
    "event": "client demand staying strong",
    "scenarios": [
      "client demand stays strong",
      "client demand falls short"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money does my business have before hiring?",
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
    "actor": "I"
  },
  "new-product": {
    "go": "launch the product",
    "stay": "stick with my existing products",
    "yes": "Launch the product.",
    "no": "Hold off on the launch.",
    "questions": {
      "A": "If I launch the product and the market responds well…",
      "B": "If I launch the product and the market response disappoints…",
      "C": "If I stick with my existing products and the market responds well…",
      "D": "If I stick with my existing products and the market response disappoints…"
    },
    "simpleQuestion": "If I stick with my existing products…",
    "probabilityQuestion": "How likely is a strong market response?",
    "event": "a strong market response",
    "scenarios": [
      "the market responds well",
      "the market response disappoints"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money does my business have before the launch?",
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
    "actor": "I"
  },
  "large-order": {
    "go": "accept the order",
    "stay": "turn down the order",
    "yes": "Take the order.",
    "no": "Turn down this order.",
    "questions": {
      "A": "If I accept the order and delivery and payment go smoothly…",
      "B": "If I accept the order and delivery or payment goes wrong…",
      "C": "If I turn down the order, though delivery and payment would have gone smoothly…",
      "D": "If I turn down the order and delivery or payment would have gone wrong…"
    },
    "simpleQuestion": "If I turn down the order…",
    "probabilityQuestion": "How likely are smooth delivery and full payment?",
    "event": "smooth delivery and full payment",
    "scenarios": [
      "delivery and payment would go smoothly",
      "delivery or payment would go wrong"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money does my business have before taking the order?",
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
    "actor": "I"
  },
  "equipment": {
    "go": "buy the new equipment",
    "stay": "keep the old equipment",
    "yes": "Buy the equipment.",
    "no": "Keep the existing equipment.",
    "questions": {
      "A": "If I buy the new equipment and demand makes use of the extra capacity…",
      "B": "If I buy the new equipment and demand stays weak…",
      "C": "If I keep the old equipment and demand makes use of the extra capacity…",
      "D": "If I keep the old equipment and demand stays weak…"
    },
    "simpleQuestion": "If I keep the old equipment…",
    "probabilityQuestion": "How likely is demand to justify the extra capacity?",
    "event": "demand justifying the extra capacity",
    "scenarios": [
      "demand makes use of the extra capacity",
      "demand stays weak"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money does my business have before buying the equipment?",
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
    "actor": "I"
  },
  "training-course": {
    "go": "pay for the course",
    "stay": "skip the course",
    "yes": "Take the course.",
    "no": "Skip this course.",
    "questions": {
      "A": "If I pay for the course and the better-paid opportunity arrives…",
      "B": "If I pay for the course and that opportunity does not arrive in time…",
      "C": "If I skip the course, though the better-paid opportunity would have arrived…",
      "D": "If I skip the course and that opportunity would not have arrived in time…"
    },
    "simpleQuestion": "If I skip the course…",
    "probabilityQuestion": "How likely is the better-paid opportunity within the year?",
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
    "actor": "I"
  },
  "lottery-ticket": {
    "go": "buy the ticket",
    "stay": "keep my ticket money",
    "yes": "Buy the ticket.",
    "no": "Keep the ticket money.",
    "questions": {
      "A": "If I buy the ticket and my chosen numbers win…",
      "B": "If I buy the ticket and my chosen numbers do not win…",
      "C": "If I keep my ticket money and my chosen numbers win…",
      "D": "If I keep my ticket money and my chosen numbers do not win…"
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
    "actor": "I"
  },
  "repair-or-replace": {
    "go": "replace the car",
    "stay": "repair my current car",
    "yes": "Replace the car.",
    "no": "Repair the current car.",
    "questions": {
      "A": "If I replace the car and the year’s motoring goes smoothly…",
      "B": "If I replace the car and the year brings expensive problems…",
      "C": "If I repair my current car and the year’s motoring goes smoothly…",
      "D": "If I repair my current car and the year brings expensive problems…"
    },
    "simpleQuestion": "If I repair my current car…",
    "probabilityQuestion": "How likely is a smooth year of motoring?",
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
    "actor": "I"
  },
  "performance-bonus": {
    "go": "take the bonus-based job",
    "stay": "stay with the guaranteed pay rise",
    "yes": "Take the bonus-based job.",
    "no": "Take the guaranteed pay rise.",
    "questions": {
      "A": "If I take the bonus-based job and performance earns the hoped-for bonus…",
      "B": "If I take the bonus-based job and performance falls short…",
      "C": "If I stay with the guaranteed pay rise and performance earns the hoped-for bonus…",
      "D": "If I stay with the guaranteed pay rise and performance falls short…"
    },
    "simpleQuestion": "If I stay with the guaranteed pay rise…",
    "probabilityQuestion": "How likely am I to earn the hoped-for bonus?",
    "event": "earning the hoped-for bonus",
    "scenarios": [
      "performance earns the hoped-for bonus",
      "performance falls short"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money do I have before this job decision?",
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
    "actor": "I"
  },
  "refundable-booking": {
    "go": "buy the refundable booking",
    "stay": "buy the non-refundable booking",
    "yes": "Choose the refundable booking.",
    "no": "Choose the non-refundable booking.",
    "questions": {
      "A": "If I buy the refundable booking and the trip goes ahead…",
      "B": "If I buy the refundable booking and the trip has to be cancelled…",
      "C": "If I buy the non-refundable booking and the trip goes ahead…",
      "D": "If I buy the non-refundable booking and the trip has to be cancelled…"
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
    "actor": "I"
  },
  "ask-someone-out": {
    "go": "ask them out",
    "stay": "leave it unasked",
    "yes": "Ask them out.",
    "no": "Leave it for now.",
    "questions": {
      "A": "If I ask them out and there is mutual interest…",
      "B": "If I ask them out and there is no mutual interest…",
      "C": "If I leave it unasked and there is mutual interest…",
      "D": "If I leave it unasked and there is no mutual interest…"
    },
    "simpleQuestion": "If I leave it unasked…",
    "probabilityQuestion": "How likely is mutual interest?",
    "event": "mutual interest",
    "scenarios": [
      "there is mutual interest",
      "there is no mutual interest"
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
    "actor": "I"
  },
  "new-city": {
    "go": "move to the new city",
    "stay": "stay where I am",
    "yes": "Make the move.",
    "no": "Stay where you are for now.",
    "questions": {
      "A": "If I move to the new city and life there suits me…",
      "B": "If I move to the new city and life there feels wrong…",
      "C": "If I stay where I am and life in the new city would have suited me…",
      "D": "If I stay where I am and life there would not have suited me…"
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
    "actor": "I"
  },
  "difficult-conversation": {
    "go": "have the conversation",
    "stay": "leave the subject alone",
    "yes": "Have the conversation.",
    "no": "Leave the subject for now.",
    "questions": {
      "A": "If I have the conversation and my friend is receptive…",
      "B": "If I have the conversation and my friend is not receptive…",
      "C": "If I leave the subject alone and my friend would have been receptive…",
      "D": "If I leave the subject alone and my friend would not have been receptive…"
    },
    "simpleQuestion": "If I leave the subject alone…",
    "probabilityQuestion": "How likely is my friend to be receptive?",
    "event": "my friend being receptive",
    "scenarios": [
      "my friend would be receptive",
      "my friend would not be receptive"
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
    "actor": "I"
  },
  "new-hobby": {
    "go": "try the class",
    "stay": "give the class a miss",
    "yes": "Give the class a go.",
    "no": "Give this class a miss.",
    "questions": {
      "A": "If I try the class and the class is a good fit…",
      "B": "If I try the class and the class is not a good fit…",
      "C": "If I give the class a miss and the class would have been a good fit…",
      "D": "If I give the class a miss and the class would not have been a good fit…"
    },
    "simpleQuestion": "If I give the class a miss…",
    "probabilityQuestion": "How likely is this class to be a good fit for me?",
    "event": "the class being a good fit",
    "scenarios": [
      "the class would be a good fit",
      "the class would not be a good fit"
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
    "actor": "I"
  },
  "competition": {
    "go": "enter the competition",
    "stay": "sit this competition out",
    "yes": "Enter the competition.",
    "no": "Sit this one out.",
    "questions": {
      "A": "If I enter the competition and my entry gets the response I hope for…",
      "B": "If I enter the competition and my entry does not get that response…",
      "C": "If I sit this competition out and my entry would have got the response I hoped for…",
      "D": "If I sit this competition out and my entry would not have got that response…"
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
    "actor": "I"
  },
  "challenging-role": {
    "go": "lead the project",
    "stay": "take the smaller familiar role",
    "yes": "Lead the project.",
    "no": "Take the smaller role.",
    "questions": {
      "A": "If I lead the project and the support and working relationships are good…",
      "B": "If I lead the project and the support and working relationships are difficult…",
      "C": "If I take the smaller familiar role and the support and working relationships are good…",
      "D": "If I take the smaller familiar role and the support and working relationships are difficult…"
    },
    "simpleQuestion": "If I take the smaller familiar role…",
    "probabilityQuestion": "How likely are good support and working relationships?",
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
    "actor": "I"
  },
  "old-friend": {
    "go": "send the message",
    "stay": "leave the message unsent",
    "yes": "Send the message.",
    "no": "Leave the message for now.",
    "questions": {
      "A": "If I send the message and my friend welcomes contact…",
      "B": "If I send the message and my friend does not respond warmly…",
      "C": "If I leave the message unsent and my friend would have welcomed contact…",
      "D": "If I leave the message unsent and my friend would not have responded warmly…"
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
    "actor": "I"
  },
  "perform-in-public": {
    "go": "perform at the evening",
    "stay": "skip the performance",
    "yes": "Step up and perform.",
    "no": "Skip this performance.",
    "questions": {
      "A": "If I perform at the evening and the evening feels encouraging…",
      "B": "If I perform at the evening and the evening feels uncomfortable…",
      "C": "If I skip the performance and the evening would have felt encouraging…",
      "D": "If I skip the performance and the evening would have felt uncomfortable…"
    },
    "simpleQuestion": "If I skip the performance…",
    "probabilityQuestion": "How likely is the evening to feel encouraging?",
    "event": "an encouraging evening",
    "scenarios": [
      "the evening would feel encouraging",
      "the evening would feel uncomfortable"
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
    "actor": "I"
  },
  "organise-gathering": {
    "go": "host the gathering",
    "stay": "have a quiet evening instead",
    "yes": "Host the gathering.",
    "no": "Choose the quiet evening.",
    "questions": {
      "A": "If I host the gathering and the gathering is enjoyable…",
      "B": "If I host the gathering and the gathering is disappointing…",
      "C": "If I have a quiet evening instead and the gathering would have been enjoyable…",
      "D": "If I have a quiet evening instead and the gathering would have been disappointing…"
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
    "actor": "I"
  },
  "solo-trip": {
    "go": "take the solo trip",
    "stay": "stay home",
    "yes": "Take the solo trip.",
    "no": "Stay home for now.",
    "questions": {
      "A": "If I take the solo trip and the solo experience suits me…",
      "B": "If I take the solo trip and the solo experience does not suit me…",
      "C": "If I stay home and the solo experience would have suited me…",
      "D": "If I stay home and the solo experience would not have suited me…"
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
    "actor": "I"
  },
  "heathrow-third-runway": {
    "go": "commit to building the third runway",
    "stay": "retain the existing airport business",
    "yes": "Commit to construction.",
    "no": "Hold off on construction.",
    "questions": {
      "A": "If we commit to building the third runway and demand, charges and delivery support expansion…",
      "B": "If we commit to building the third runway and commercial performance or delivery disappoints…",
      "C": "If we retain the existing airport business and demand, charges and delivery support expansion…",
      "D": "If we retain the existing airport business and commercial performance or delivery disappoints…"
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
    "actor": "we"
  },
  "nuclear-investment": {
    "go": "finance the new power station",
    "stay": "retain the existing energy investments",
    "yes": "Back the power project.",
    "no": "Keep the existing investments.",
    "questions": {
      "A": "If we finance the new power station and power-market conditions and delivery support the project…",
      "B": "If we finance the new power station and costs, delays or power-market conditions disappoint…",
      "C": "If we retain the existing energy investments and power-market conditions and delivery support the project…",
      "D": "If we retain the existing energy investments and costs, delays or power-market conditions disappoint…"
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
    "actor": "we"
  },
  "stadium-funding": {
    "go": "fund the stadium",
    "stay": "decline the stadium contribution",
    "yes": "Back the stadium deal.",
    "no": "Pass on this stadium deal.",
    "questions": {
      "A": "If we fund the stadium and attendance and local commercial activity are strong…",
      "B": "If we fund the stadium and attendance and commercial activity disappoint…",
      "C": "If we decline the stadium contribution and attendance and local commercial activity are strong…",
      "D": "If we decline the stadium contribution and attendance and commercial activity disappoint…"
    },
    "simpleQuestion": "If we decline the stadium contribution…",
    "probabilityQuestion": "How likely are strong attendance and local commercial activity?",
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
    "actor": "we"
  },
  "flood-defences": {
    "go": "fund the flood defences",
    "stay": "keep the current flood protection",
    "yes": "Build the flood defences.",
    "no": "Keep the current protection.",
    "questions": {
      "A": "If we fund the flood defences and a damaging flood occurs during the appraisal period…",
      "B": "If we fund the flood defences and no damaging flood occurs during that period…",
      "C": "If we keep the current flood protection and a damaging flood occurs during the appraisal period…",
      "D": "If we keep the current flood protection and no damaging flood occurs during that period…"
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
    "actor": "we"
  },
  "phone-warranty": {
    "go": "buy the extended cover",
    "stay": "skip the extended cover",
    "yes": "Buy the extra cover.",
    "no": "Skip the extra cover.",
    "questions": {
      "A": "If I buy the extended cover and my phone has no covered fault over the two years…",
      "B": "If I buy the extended cover and my phone develops a covered fault in that period…",
      "C": "If I skip the extended cover and my phone has no covered fault over the two years…",
      "D": "If I skip the extended cover and my phone develops a covered fault in that period…"
    },
    "simpleQuestion": "If I skip the extended cover…",
    "probabilityQuestion": "How likely is my phone to avoid a covered fault over the two years?",
    "event": "no covered fault over the two years",
    "scenarios": [
      "my phone has no covered fault over the two years",
      "my phone develops a covered fault in that period"
    ],
    "probabilityScenario": 0,
    "resourceQuestion": "How much money do I have before any cover or repair bills?",
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
    "actor": "I"
  }
};
function forState(d){return configs[d?.templateId||d?.exampleId||d?.exampleQuestion]||null;}
function question(d,key){const c=forState(d);return c?(key==='C'&&d.mode==='simplified'?c.simpleQuestion:c.questions[key]):null;}
function headline(d,go){const c=forState(d);return c?(go?c.yes:c.no):null;}
function summary(d,r){const c=forState(d);if(!c)return null;const goBad=r.rg.blocked||r.comparison.badGo,stayBad=r.rs.blocked||r.comparison.badStay;
 const selected=r.goForIt?c.go:c.stay,cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
 if(goBad&&stayBad)return 'Both '+c.go+' and '+c.stay+' raise a concern about '+(d.kind==='money'?'losses':'how the outcomes could feel')+' or serious harm. Look for a different way forward.';
 if(goBad)return (r.rg.blocked?'You flagged serious or irreversible harm if you '+c.go+'.':'One possible outcome if you '+c.go+' would use up the '+(d.kind==='money'?'starting financial resources':'emotional strength')+' you entered.')+' The Decider favours the alternative: '+c.stay+'.';
 if(stayBad)return (r.rs.blocked?'You flagged serious or irreversible harm if you '+c.stay+'.':'One possible outcome if you '+c.stay+' would use up the '+(d.kind==='money'?'starting financial resources':'emotional strength')+' you entered.')+' The Decider favours the alternative: '+c.go+'.';
 if(!r.comparisonResolved)return 'The answers for “'+c.go+'” and “'+c.stay+'” are too close for a reliable numerical comparison.';
 if(r.comparison.exactTie)return 'Your answers leave “'+c.go+'” and “'+c.stay+'” evenly balanced.';
 return 'The Decider favours “'+selected+'”. '+(d.kind==='money'?'The possible gains and costs, their chances and the financial resources you entered favour this choice.':'How each outcome could feel, its chances and your emotional strength favour this choice.');
}
const api={configs,forState,question,headline,summary};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.DeciderLabels=api;
})(typeof globalThis!=='undefined'?globalThis:this);
