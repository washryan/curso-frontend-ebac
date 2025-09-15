import styled from 'styled-components'

const HeroWrapper = styled.section`
  height: 360px;
  width: 100%;
  background-image: url('https://cdn.pixabay.com/photo/2018/08/10/15/45/woman-3597101_1280.jpg');
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    content: '';
  }
`

const HeroTitle = styled.h2`
  color: white;
  font-family: Gloock, serif;
  font-size: 48px;
  margin: 0;
  z-index: 1;
`

const Hero = () => (
  <HeroWrapper>
    <div style={{ width: '100%' }} className="container">
      <HeroTitle>
        As melhores vagas para tecnologia, design e artes visuais.
      </HeroTitle>
    </div>
  </HeroWrapper>
)

export default Hero
