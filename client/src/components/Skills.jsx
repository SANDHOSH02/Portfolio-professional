import { useRef } from 'react'
import useFloatingIcons from '../hooks/useFloatingIcons'

const skills = [
  { href: 'https://react.dev/', img: '/assets/skills/React.png', alt: 'react', tip: 'React: JavaScript library for building UI' },
  { href: 'https://www.w3.org/Style/CSS/', img: '/assets/skills/CSS3.png', alt: 'css', tip: 'CSS3: Styling web pages' },
  { href: 'https://getbootstrap.com/', img: '/assets/skills/Bootstrap.png', alt: 'Bootstrap', tip: 'Bootstrap: Front-end framework' },
  { href: 'https://git-scm.com/', img: '/assets/skills/Git.png', alt: 'git', tip: 'Git: Version control system' },
  { href: 'https://github.com/', img: '/assets/skills/GitHub.png', alt: 'github', tip: 'GitHub: Code hosting platform' },
  { href: 'https://www.w3.org/TR/html5/', img: '/assets/skills/HTML5.png', alt: 'html', tip: 'HTML5: Web structure markup' },
  { href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', img: '/assets/skills/JavaScript.png', alt: 'JavaScript', tip: 'JavaScript: Programming language' },
  { href: 'https://tailwindcss.com/', img: '/assets/skills/Tailwind CSS.png', alt: 'Tailwind CSS', tip: 'Tailwind CSS: Utility-first CSS' },
  { href: 'https://code.visualstudio.com/', img: '/assets/skills/Visual Studio Code (VS Code).png', alt: 'VS Code', tip: 'VS Code: Coding platform' },
  { href: 'https://dart.dev/', img: '/assets/skills/Dart.png', alt: 'Dart', tip: 'Dart: Programming language' },
  { href: 'https://www.figma.com/', img: '/assets/skills/Figma.png', alt: 'Figma', tip: 'Figma: Web-based design tool UI & UX' },
  { href: 'https://flask.palletsprojects.com/', img: '/assets/skills/Flask.png', alt: 'Flask', tip: 'Flask: Web application framework' },
  { href: 'https://www.mongodb.com/', img: '/assets/skills/MongoDB.png', alt: 'MongoDB', tip: 'MongoDB: Database' },
  { href: 'https://www.python.org/', img: '/assets/skills/Python.png', alt: 'Python', tip: 'Python: Programming language' },
  { href: 'https://www.canva.com/', img: '/assets/skills/Canva.png', alt: 'Canva', tip: 'Canva: Online graphic design platform' },
  { href: 'https://www.djangoproject.com/', img: '/assets/skills/Django.png', alt: 'Django', tip: 'Django: Python web framework' },
  { href: 'https://flutter.dev/', img: '/assets/skills/Flutter.png', alt: 'Flutter', tip: 'Flutter: Build cross-platform mobile, web, and desktop' },
  { href: 'https://www.kaggle.com/', img: '/assets/skills/Kaggle.png', alt: 'Kaggle', tip: 'Kaggle: Data Science Platform' },
  { href: 'https://www.mysql.com/', img: '/assets/skills/MySQL.png', alt: 'MySQL', tip: 'MySQL: Database' },
  { href: 'https://nodejs.org/en', img: '/assets/skills/Node.js.png', alt: 'Node.js', tip: 'Node JS: Backend Development Framework' },
  { href: 'https://www.php.net/', img: '/assets/skills/PHP.png', alt: 'PHP', tip: 'PHP: Server-side scripting language' },
]

export default function Skills() {
  const flootRef = useRef(null)
  useFloatingIcons(flootRef)

  return (
    <div id="Skills">
      <img src="/assets/projects/skills.svg" alt="" />
      <div className="container_S">
        <div className="floot" ref={flootRef}>
          <div className="icons">
            {skills.map((skill, i) => (
              <a key={i} className="tooltip" href={skill.href} target="_blank" rel="noopener noreferrer">
                <img src={skill.img} alt={skill.alt} />
                <span className="tooltiptext">{skill.tip}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
