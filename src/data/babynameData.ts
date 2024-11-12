interface NameData {
    traditional: {
      male: string[];
      female: string[];
    };
    modern: {
      male: string[];
      female: string[];
    };
    unique: {
      male: string[];
      female: string[];
    };
    meanings: {
      [key: string]: string[];
    };
  }
  
  export const nameData: NameData = {
    traditional: {
      male: ['James', 'William', 'Henry', 'George', 'Charles', 'Edward', 'Arthur', 'Thomas', 'Oliver', 'Harry'],
      female: ['Elizabeth', 'Mary', 'Victoria', 'Charlotte', 'Alice', 'Emma', 'Grace', 'Sarah', 'Lucy', 'Anna']
    },
    modern: {
      male: ['Liam', 'Noah', 'Ethan', 'Mason', 'Lucas', 'Aiden', 'Jackson', 'Sebastian', 'Jack', 'Leo'],
      female: ['Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Luna', 'Harper', 'Aria', 'Zoe', 'Lily']
    },
    unique: {
      male: ['Atlas', 'Phoenix', 'Orion', 'Kai', 'Jasper', 'Felix', 'River', 'August', 'Finn', 'Rowan'],
      female: ['Aurora', 'Nova', 'Willow', 'Hazel', 'Iris', 'Sage', 'Juniper', 'Ruby', 'Eden', 'Maple']
    },
    meanings: {
      strength: ['Alexander', 'Audrey', 'Ethan', 'Valerie', 'Andrew', 'Gabriella', 'Aaron', 'Andrea'],
      wisdom: ['Sophia', 'Solomon', 'Cynthia', 'Hugo', 'Kenneth', 'Claire', 'Alfred', 'Minerva'],
      peace: ['Frida', 'Solomon', 'Irene', 'Frederick', 'Serena', 'Oliver', 'Paloma', 'Axel'],
      nature: ['Rose', 'River', 'Dawn', 'Forest', 'Ivy', 'Brook', 'Glen', 'Dahlia']
    }
  };
  
  export const origins = [
    'English', 'Celtic', 'Greek', 'Latin', 'Hebrew', 'Germanic', 
    'Nordic', 'French', 'Italian', 'Spanish', 'Japanese', 'Chinese'
  ];
  
  export const syllables = ['short', 'medium', 'long'];
  
  export const meaningsList = Object.keys(nameData.meanings);