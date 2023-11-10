import { faListUl, faHouse, faCloud, faClock, faDatabase, faSackDollar, faSquareEnvelope, faRegistered } from '@fortawesome/free-solid-svg-icons'
import { faReact, faJs, faPython, faHtml5, faSass, faGithub, faLinkedin, faTelegram, faJava, faGit } from '@fortawesome/free-brands-svg-icons'


const Items = {
    items: [
        {to: '/', text: 'Home', icon: faHouse},
        {to: '/todo', text: 'To-Do', icon: faListUl},
        {to: '/money', text: 'Cash Counter', icon: faSackDollar},       
        {to: '/weather', text: 'Weather', icon: faCloud},
        {to: '/clock', text: 'Clock', icon: faClock},
        
    ],

    stackItems: [
        {text: 'React', icon: faReact},
        {text: 'JS+TS', icon: faJs},
        {text: 'Python', icon: faPython},
        {text: 'HTML', icon: faHtml5},
        {text: 'SASS', icon: faSass},
        {text: 'SQL', icon: faDatabase},
        {text: 'Git', icon: faGit},
        {text: 'Java', icon: faJava},
    ],


    socialItems: [
        {to: 'mailto:kk28022004@mail.ru', icon: faSquareEnvelope, color: 'var(--accentColor)'},
        {to: 'https://web.telegram.org/k/#@nikonikonow', icon: faTelegram, color: '#229ED9'},
        {to: 'https://github.com/NikoNikoIn', icon: faGithub, color: '#ff702e'},
        {to: 'https://www.linkedin.com/in/kreerenko-maxim-078005251/', icon: faLinkedin, color: '#258dbf'},
        {to: 'https://rabota.by/resume/d2cf64daff0be8b9890039ed1f6e554c676772?hhtmFrom=resume_list', icon: faRegistered, color: '#db2134'},
    ],

    taskColors: [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722'
    ],

    currencyList: [
        'BYN',
        '$',
        '€',
        '₽',
        '₴',
        '₸',
    ],

    addList: [
        'Salary',
        'Side pay',
        'Other way'
    ],

    subtractList: [
        'Bills',
        'Groceries',
        'Food',
        'Clothes',
        'Leisure',
        'Purchase',
        'Other'
    ]
}



export default Items
