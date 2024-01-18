import { useEffect, useState, useRef } from 'react';

import DatePicker from 'Components/DatePicker';

const random = (min, max) => Math.random() * (max - min) + min;

const opacityDuration = 1;

const emojis = ['🍔', '🍕', '🍟', '🌭', '🍿', '🍗', '🔥'];

const Bubble = ({ id, onAnimationEnd }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const size = useRef(random(0.7, 1.5));

  const element = useRef();
  const emoji = useRef(Math.floor(random(0, emojis.length - 1)));

  const initialOptions = useRef({ animationDuration: random(2, 5), element, onAnimationEnd, id });

  useEffect(() => {
    const { animationDuration, element, onAnimationEnd, id } = initialOptions.current;

    element.current.addEventListener('transitionend', event => {
      if (event.propertyName === 'opacity') {
        onAnimationEnd(id);
      }
    });

    setTimeout(() => {
      setPosition(prevState => ({ ...prevState, x: random(-40, 40), y: random(-100, -200) }));
    }, 5);

    setTimeout(() => setOpacity(0), (animationDuration - opacityDuration) * 1000);
  }, []);

  return (
    <div
      style={{
        top: 0,
        color: 'red',
        fontSize: '2em',
        left: '50%',
        opacity,
        pointerEvents: 'none',
        position: 'absolute',
        transform: `translate(calc(-50% + ${position.x}px), calc(-100% + ${position.y}px)) scale(${size.current})`,
        textShadow: '0 0 5px rgba(0, 0, 0, .25)',
        transition: `transform ${initialOptions.current.animationDuration}s linear, opacity ${opacityDuration}s ease-in-out`,
      }}
      ref={element}>
      {emojis[emoji.current]}
    </div>
  );
};

const Analytics = () => {
  const [value, onChange] = useState(new Date());

  const [likes, setLikes] = useState([]);
  const cleanLike = useRef(id => {
    setLikes(currentLikes => currentLikes.filter(like => like !== id));
  });

  return (
    <div className='relative mt-40 mx-40 w-20 flex items-center'>
      <DatePicker minDate='2024-01-10' maxDate='2024-01-25' value={value} onChange={onChange} />

      <button onClick={() => setLikes(prevLikes => [...prevLikes, new Date().getTime()])}>Like</button>

      {likes.map(id => (
        <Bubble onAnimationEnd={cleanLike.current} key={id} id={id} />
      ))}
    </div>
  );
};

export default Analytics;
