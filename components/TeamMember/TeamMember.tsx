import { useContext } from 'react'
import { ThemeContext } from '../Theme'
import Button from '../Button'

type TeamMember = {
  name: string
  avatar: string
  position: string
  bio: string
  twitter: string
}

function TeamMember({ name, avatar, position, bio, twitter }: TeamMember) {
  const theme = useContext(ThemeContext)

  return (
    <div className="font-sans opacity-0">
      <img className="mb-4 rounded-lg" src={avatar} />
      <h3 className="mb-1 text-2xl">{name}</h3>
      <h4 className="mb-4 font-mono uppercase lg:text-lg">{position}</h4>
      <p className="mb-4 text-sm lg:text-base">{bio}</p>
      <Button
        href={`https://twitter.com/${twitter}`}
        target="_blank"
        rel="noreferrer"
        size="sm"
        onMouseOver={(e) => {
          e.target.style.backgroundColor = 'transparent'
          e.target.style.borderColor = theme.primaryColor
          e.target.style.color = theme.primaryColor
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = theme.primaryColor
          e.target.style.borderColor = 'transparent'
          e.target.style.color = '#303030'
        }}>
        Twitter
      </Button>
    </div>
  )
}

export default TeamMember
