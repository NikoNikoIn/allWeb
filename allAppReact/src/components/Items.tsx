import React from 'react'
import { faListUl, faHouse, faCloud, faClock, faDatabase, faSackDollar, faSquareEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faReact, faJs, faPython, faHtml5, faSass, faGithub, faLinkedin, faTelegram, faJava } from '@fortawesome/free-brands-svg-icons'


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
        {text: 'GitHub', icon: faGithub},
        {text: 'Java', icon: faJava},

    ],


    socialItems: [
        {to: 'mailto:kk28022004@mail.ru', icon: faSquareEnvelope, color: 'var(--accentColor)'},
        {to: 'https://web.telegram.org/k/#@nikonikonow', icon: faTelegram, color: '#428df5'},
        {to: 'https://github.com/NikoNikoIn', icon: faGithub, color: '#ff702e'},
        {to: 'https://www.linkedin.com/in/kreerenko-maxim-078005251/', icon: faLinkedin, color: '#4df6ff'},
    ]
    
}



export default Items
