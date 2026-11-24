type Question = {
  prompt: string;
  choices: readonly [string, string, string];
  correct: 0 | 1 | 2;
  feedback: string;
};

type Lesson = {
  id: string;
  title: string;
  skill: string;
  minutes: string;
  explanation: readonly string[];
  example: string;
  quiz: readonly [Question, Question, Question];
  action: string;
};

export const efLessons: readonly Lesson[] = [
  {
    id: 'control-center',
    title: 'Your Brain’s Control Center',
    skill: 'Spot which skill a task needs',
    minutes: '5–6 min',
    explanation: [
      'Picture the last ten minutes before school. You need to pack your bag, remember a permission slip, and leave on time. Executive functioning is the name for the skills your brain uses to juggle jobs like these. Planning helps you choose what to do and in what order. Focus helps you stay with one thing. Working memory holds information in mind long enough to use it. Self-control gives you a moment to pause and choose what to do next.',
      'The same skills show up in class. You might plan when to study, focus on a practice question, remember what the teacher asked, or pause before switching to a group chat. A single task can use several skills. If you get stuck halfway through, ask yourself what would help right now. A list helps when you lose track of steps. A timer helps when you lose track of time. A quieter spot helps when every conversation pulls your attention away.',
      'These skills can feel different depending on the day, the task, and how much is going on around you. Think of this module as a chance to try a few tools and find ones you will actually use. Pick one recent school task and notice the exact moment it got harder.',
    ],
    example: 'Sam keeps reopening the homework portal to check the directions. Writing down “read pages 12–14, then answer questions 1–3” gives Sam a place to look while working.',
    quiz: [
      { prompt: 'Which skill helps you choose an order for three tasks?', choices: ['Focus', 'Planning', 'Working memory'], correct: 1, feedback: 'Planning means choosing steps and putting them in order.' },
      { prompt: 'Which tool helps you hold onto directions while you work?', choices: ['A written list', 'A louder playlist', 'An extra browser tab'], correct: 0, feedback: 'A written list keeps the directions available when you need them.' },
      { prompt: 'You notice a message and pause before opening it. Which skill did you use?', choices: ['Estimating time', 'Organizing files', 'Self-control'], correct: 2, feedback: 'Self-control gives you a moment to decide what to do next.' },
    ],
    action: 'When a school task gets tricky, name the skill you need and try one tool that helps.',
  },
  {
    id: 'plan',
    title: 'Plan It Before You Do It',
    skill: 'Break down a real assignment',
    minutes: '6–8 min',
    explanation: [
      '“Do my project” can feel like one giant job. Give your brain a smaller target by describing what finished looks like. For a history essay, that might be “a two-page essay with three sources, uploaded by Friday.” Look at the directions once, then write a few actions that take you from where you are now to that finished result.',
      'Start each step with a verb you can act on. “Research” can still feel huge. “Find two sources about my topic” gives you a clear place to start and a way to tell when you are done. If a step still feels hard to begin, shrink it again. You can open the class notes, highlight two useful facts, or type a rough first sentence. Put steps in an order that makes sense. It is easier to draft a paragraph when you can find the source you want to quote.',
      'Work backward from the due date. Leave a little space to reread your work or ask a question. If your plan changes, cross out a step and move it. Before you close your planner, choose the first action and decide when you will do it. A plan you can start today is easier to use when tomorrow gets busy.',
    ],
    example: 'For a Friday history essay, Kai picks a topic on Monday, finds sources on Tuesday, drafts on Wednesday, and checks the rubric and uploads on Thursday.',
    quiz: [
      { prompt: 'Which step is easiest to start?', choices: ['Do everything', 'Be better at history', 'Find two sources'], correct: 2, feedback: 'A concrete action tells you what to do and when the step is done.' },
      { prompt: 'What helps you decide which steps you need?', choices: ['Define what finished looks like', 'Pick a new font', 'Guess what a friend did'], correct: 0, feedback: 'The finished result tells you what your plan needs to cover.' },
      { prompt: 'Why leave space before the due date?', choices: ['To fill the space with extra work', 'To check work or ask a question', 'To make a longer list'], correct: 1, feedback: 'Extra time gives you room to catch problems and make changes.' },
    ],
    action: 'Choose one upcoming assignment and write its first three steps before you start.',
  },
  {
    id: 'time',
    title: 'Time, Tamed',
    skill: 'Build a realistic plan for tomorrow',
    minutes: '6–8 min',
    explanation: [
      'Before you start homework, try guessing how many minutes it will take. When you finish, compare your guess with the clock. This is how you build a better sense of time. Remember to count the time you spend finding your notebook, reading directions, and packing up. Those minutes are part of the job too.',
      'A calendar answers “When will I do this?” and a timer answers “How much time am I giving this right now?” Put fixed things such as school, practice, or dinner on your calendar first. Then find an open stretch and give one task a time block. Start with 30 minutes. A short task can share its block with a break or a small chore. A longer task can use two blocks, with time to stretch in between.',
      'Give yourself some room when you plan. If you think a worksheet will take 20 minutes, a 30-minute block lets you slow down on a harder question. When time is up, notice how far you got. You can finish during another block, ask for help, or decide what to tackle first. Try comparing your estimates with real times for a few days. Use what you learn when you plan the next week.',
    ],
    example: 'Avery has practice at 5:00. They put math in the 3:30–4:00 block and SAT reading in the 4:00–4:30 block, leaving half an hour to pack and get to practice.',
    quiz: [
      { prompt: 'Which tool tells you when to do a job?', choices: ['A calendar', 'A highlighter', 'A countdown timer'], correct: 0, feedback: 'A calendar gives a task a place in your day.' },
      { prompt: 'What belongs in an estimate for a worksheet?', choices: ['Only the easiest questions', 'Setup, directions, and work time', 'Only the time you spend writing'], correct: 1, feedback: 'Include the small steps that happen before and after the work.' },
      { prompt: 'A task takes longer than expected. What could you do?', choices: ['Erase the whole plan', 'Skip dinner', 'Give the rest another block'], correct: 2, feedback: 'A time block is a plan you can adjust when you learn more.' },
    ],
    action: 'Estimate and time one assignment, then use the actual time to plan the next one.',
  },
  {
    id: 'organize',
    title: 'Get Organized',
    skill: 'Give school materials a home',
    minutes: '5–7 min',
    explanation: [
      'Think of something you often have to hunt for before homework. Maybe it is a charger, a worksheet, or the latest draft of an essay. Give that thing a home you can remember and reach easily. A pencil pouch, one turn-in folder, or a clearly named folder on your device can save a lot of searching.',
      'Keep the system simple enough to use on a busy day. Give loose papers one spot to land. Later, sort them into three groups: work to do or turn in, things to keep, and things you can recycle. For notes, write the date and subject at the top, then mark one thing you want to review. For files, use a name you can search, such as “History - Railroads essay - draft.” If you want to save older versions, add the date or a version number.',
      'Set aside five minutes for a small reset. Look at the place where you start homework, or open the backpack pocket where papers pile up. Clear what is in your way, put the things you use most where you can reach them, and check what you need for tomorrow. A quick reset on a regular day can make the next start easier.',
    ],
    example: 'Jordan makes one folder for each class and keeps a single “Turn in” pocket in their binder. The next morning, their signed lab sheet is right where they expect it.',
    quiz: [
      { prompt: 'Which file name is easiest to find later?', choices: ['final-final', 'History - Railroads essay - draft', 'Untitled 12'], correct: 1, feedback: 'A subject and task name give you useful search words.' },
      { prompt: 'Where should tomorrow’s worksheet go?', choices: ['Under a pile on the desk', 'In a random pocket', 'In the same turn-in pocket you check each day'], correct: 2, feedback: 'A regular home makes the worksheet easier to find.' },
      { prompt: 'How can you make a reset manageable?', choices: ['Spend five minutes on one area', 'Empty every drawer at once', 'Wait for the end of the term'], correct: 0, feedback: 'One small area is a good target for a short reset.' },
    ],
    action: 'Pick one home for papers you need tomorrow and check it before you pack.',
  },
  {
    id: 'focus',
    title: 'Focus Like a Pro',
    skill: 'Try a 10-minute focus sprint',
    minutes: '5–7 min + 10-min sprint',
    explanation: [
      'Deep work is a stretch of time when you give one job your attention. If you are studying for a test, the job could be solving three practice problems. If you are writing, it could be drafting one paragraph. A clear job helps you notice when your attention has wandered and gives you somewhere to return.',
      'Before you start, make the work easy to reach. Open the page you need and close tabs that can wait. Put your phone out of reach or turn on Do Not Disturb if you can. Keep a scrap of paper nearby. If another task pops into your mind, write a few words and come back to it after the timer. If you get interrupted, look for the last thing you were doing and take the next small step.',
      'Try the ten-minute sprint below. Pick a job small enough to start right away and work on it until the timer ends. When you finish, notice one thing that helped you stay with it. Then stretch, get water, or take a short walk. When you want a longer round, you can open Mochi’s Focus screen and choose a session length that fits your day. Use the same setup for either timer.',
    ],
    example: 'For SAT prep, Leo opens one practice set, puts their phone in a backpack, and spends ten minutes answering and marking questions to review.',
    quiz: [
      { prompt: 'What is a clear job for a sprint?', choices: ['Catch up with everything', 'Answer three practice questions', 'Spend ten minutes switching tabs'], correct: 1, feedback: 'Three specific questions give your attention a clear target.' },
      { prompt: 'What helps when an unrelated thought pops up?', choices: ['Write a few words and return to the task', 'Open every app you might need', 'Restart the timer'], correct: 0, feedback: 'Writing it down gives you a place to find it later.' },
      { prompt: 'What could you do when the timer ends?', choices: ['Work straight through the rest of the day', 'Start over from the beginning', 'Notice what helped and take a short break'], correct: 2, feedback: 'A short review helps you set up your next focus round.' },
    ],
    action: 'Before one study session this week, set up a clear job and move your phone out of reach.',
  },
  {
    id: 'memory',
    title: 'Remember What Matters',
    skill: 'Make information easier to hold onto',
    minutes: '5–7 min',
    explanation: [
      'Working memory lets you hold information in mind while you use it. You need it when you remember the first part of a math problem while solving the second, or when a teacher gives directions as you are putting your books away. When the room gets busy or your mind moves to the next thing, part of the message can slip away.',
      'Try chunking: put several bits of information into groups that make sense to you. You might group gym shoes and a water bottle as “practice gear.” In science, you could group facts about an animal into what it eats, where it lives, and how it protects itself. A few group names give you places to look in your memory for the details.',
      'Two more tools are saying it back and writing it down. When you hear directions, repeat them in your own words. You can check them aloud with the person who gave them or say them quietly to yourself. For steps you will need later, write a few words in the place where you will see them. Try one tool at a time and see what is easiest to pick up again after a distraction during class or homework.',
    ],
    example: 'Before a lab, Maya hears “get goggles, open your notebook, write today’s date.” She says it back as “safety first, then set up notes” and writes the details on a sticky note.',
    quiz: [
      { prompt: 'Which pair makes a useful memory chunk?', choices: ['Any two words with the same length', 'Two random dates', 'Goggles and gloves for lab safety'], correct: 2, feedback: 'A meaningful group helps the details stick together.' },
      { prompt: 'What does saying directions back help you do?', choices: ['Check that you understood them', 'Make the speaker talk faster', 'Avoid looking at the task'], correct: 0, feedback: 'Putting directions into your own words lets you check what you heard.' },
      { prompt: 'You will need three directions after lunch. What could help?', choices: ['Open another tab', 'Write the steps where you’ll see them', 'Set them aside and hope they stick'], correct: 1, feedback: 'A note keeps the directions in reach until you need them.' },
    ],
    action: 'Try grouping facts into three chunks for one class, then see how many details each group helps you recall.',
  },
  {
    id: 'finish',
    title: 'Start, Stick, Finish',
    skill: 'Get moving on a task you’ve put off',
    minutes: '6–8 min',
    explanation: [
      'Sometimes a task is hard to start because it feels too big, confusing, or boring. Find a first move you can make in two minutes. You might open a slide deck and type its title, copy a tricky math problem into your notebook, or send a teacher one question. A small start gives you something concrete to build on.',
      'Once you have started, check in with yourself: “Am I working on the step I picked? What do I need next?” If you get stuck, write down the question you have. If your attention has wandered, use your plan to find where you left off. At the end of two minutes, choose whether to keep going or set a time to come back. If you stop, leave yourself a short note naming the next move.',
      'Give yourself a finish check too. Look back at the directions, make sure any files open, and turn the work in where it belongs. For a group project, check that your teammate can find your part. Notice the step that helped you get moving. You can use it the next time a new assignment feels hard to begin, even when it is for a different class.',
    ],
    example: 'Nico has put off a book report. For the first two minutes they type the title and one thought about the main character. They leave “find a quote for that thought” as the next step.',
    quiz: [
      { prompt: 'Which is a two-minute start for a book report?', choices: ['Read the whole book again', 'Type the title and one thought', 'Finish the entire report'], correct: 1, feedback: 'A small, clear action gets the assignment moving.' },
      { prompt: 'If you stop after two minutes, what helps you return?', choices: ['Leave a note naming the next step', 'Close everything without saving', 'Pick a new assignment'], correct: 0, feedback: 'A next-step note gives you a place to start when you come back.' },
      { prompt: 'What belongs in a finish check?', choices: ['Choose a new topic', 'Rewrite every sentence', 'Read the directions and check where to turn it in'], correct: 2, feedback: 'The directions tell you whether the job is ready to hand in.' },
    ],
    action: 'Use a two-minute start on one task you have been putting off. Write the next move before you stop.',
  },
];
