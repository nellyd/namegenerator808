// src/data/nameData.ts

export const nameData = {
    firstNames: {
      male: [
        'James', 'John', 'Robert', 'Michael', 'William',
        'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
        'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Donald',
        'Alexander', 'Benjamin', 'Henry', 'Oliver', 'Lucas', 'Neil', 'Nial', 'Keith', 'Andrew', 'Jon', 'Carl', 'Tom', 'Carlos',
        'Monty', 'Barron', 'Joe', 'Elvis', 'Brian'
      ],
      female: [
        'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth',
        'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
        'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia',
        'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'Abigail'
      ]
    },
    lastNames: [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
      'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
      'Anderson', 'Taylor', 'Thomas', 'Jackson', 'White',
      'Harris', 'Martin', 'Thompson', 'Young', 'King'
    ],
    nationalities: {
      english: {
        male: ['Harry', 'George', 'Jack', 'Charlie', 'Oliver'],
        female: ['Olivia', 'Amelia', 'Isla', 'Emily', 'Ava'],
        last: ['Smith', 'Jones', 'Williams', 'Taylor', 'Brown']
      },
      irish: {
        male: ['Liam', 'Conor', 'Sean', 'Patrick', 'Ryan'],
        female: ['Siobhan', 'Aoife', 'Ciara', 'Niamh', 'Aine'],
        last: ["O'Brien", "O'Connor", "O'Sullivan", "O'Neill", "Murphy"]
      },
      italian: {
        male: ['Giuseppe', 'Marco', 'Antonio', 'Giovanni', 'Francesco'],
        female: ['Sofia', 'Maria', 'Giulia', 'Anna', 'Valentina'],
        last: ['Rossi', 'Ferrari', 'Esposito', 'Romano', 'Colombo']
      },
      spanish: {
        male: ['Miguel', 'Carlos', 'Jose', 'Juan', 'Antonio'],
        female: ['Maria', 'Ana', 'Carmen', 'Sofia', 'Isabel'],
        last: ['Garcia', 'Rodriguez', 'Martinez', 'Lopez', 'Sanchez']
      }
    },
    titles: {
      formal: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'],
      nobility: ['Lord', 'Lady', 'Sir', 'Dame', 'Duke', 'Duchess'],
      professional: ['Dr.', 'Prof.', 'Rev.', 'Hon.', 'Capt.']
    },
    additionalInfo: {
      middleInitials: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
      suffixes: ['Jr.', 'Sr.', 'II', 'III', 'IV', 'Ph.D.', 'M.D.', 'Esq.']
    }
  };
  
  export type Gender = 'male' | 'female';
  export type Nationality = 'english' | 'irish' | 'italian' | 'spanish' | 'any';
  export type NameFormat = 'full' | 'firstLast' | 'formal' | 'professional';
  
  export interface GeneratedName {
    firstName: string;
    lastName: string;
    title?: string;
    middleInitial?: string;
    suffix?: string;
    nationality?: string;
    gender: string;
  }