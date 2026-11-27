window.developerBriefs = {
  plotline: {
    type: 'Developer project · Frontend demo',
    title: 'Plotline',
    subtitle: 'A browser dashboard for projects, tasks, events, and focus time',
    description: 'A browser-based workspace for organizing projects, tasks, people, events, and focus sessions. The current demo uses seeded sample data and saves changes in local browser storage.',
    role: 'I directed the project, task, calendar, and focus views. I used AI tools for planning and coding, then reviewed and adjusted the implementation.',
    process: ['Set up project and task records.', 'Build overview, project, calendar, and focus views.', 'Connect the interface to browser storage.', 'Add sample data so the demo has something to explore.'],
    tools: 'React, TypeScript, Vite, Tailwind CSS, and Zustand. The demo saves sample data in this browser.',
    status: 'Interactive front-end demo with sample data.',
    limitation: 'Changes stay in this browser and do not sync between users.',
    link: 'https://plotline-phi.vercel.app/',
    label: 'Open live demo',
    repo: 'https://github.com/jdpappdev/Plotline'
  },
  'assured-capture': {
    type: 'Developer project · Demonstration project',
    title: 'Assured Capture',
    subtitle: 'A field-inspection workflow for capturing findings and preparing documentation.',
    description: 'A mobile-first demo for recording inspection scope, issues, and photo evidence, then preparing reviewable documentation for export.',
    role: 'I directed the inspection flow, from setting the scope and recording photo evidence to reviewing an export. I used AI tools to implement and debug the demo, including its offline capture and sync workflow.',
    process: ['Set the inspection scope.', 'Record findings and attach photo evidence.', 'Keep records available offline.', 'Sync records and prepare a document for review.'],
    tools: 'IndexedDB for local records, Firestore sync, photo evidence, and document export. AI tools helped with implementation and debugging.',
    status: 'The public demo currently opens at sign-in.',
    limitation: 'You will need the configured account to access the demo and its sync features.',
    link: 'https://assured-capture-demo.vercel.app/',
    label: 'Open demo'
  },
  'deaf-contact-record': {
    type: 'Developer project · Prototype',
    title: 'Deaf Contact Record',
    subtitle: 'A prototype for coordinating contact profiles, visits, territories, and follow-ups.',
    description: 'A mobile-first prototype exploring profile records, visit history, territory assignments, follow-ups, maps, and photos for a group workflow.',
    role: 'I designed the record structure and directed the mobile flows for contacts, visits, territories, follow-ups, and maps. I used AI tools for coding and iterated on the resulting prototype.',
    process: ['Set up linked contact and visit records.', 'Add territory and follow-up views.', 'Add map and photo support.', 'Refine the screens for mobile use.'],
    tools: 'React, TypeScript, Vite, Tailwind CSS, IndexedDB, Leaflet/OpenStreetMap, and Firebase/Firestore were used across the prototype work.',
    status: 'Prototype with a public demo.',
    limitation: 'This demo is for review only. Do not enter real or private contact information.',
    link: 'https://demo-contact-record.netlify.app',
    label: 'Open prototype demo'
  }
};
