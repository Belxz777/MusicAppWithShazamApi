'use client'
import { useState } from 'react';

 export default function NotificationBanner() {
  const [showNotification, setShowNotification] = useState(true);
const [tick, settick] = useState(false)
  const handleAnswer = (tick:boolean) => {
    // Обработка ответа пользователя
    setShowNotification(tick)
    settick(tick)
    return tick;
  };
  return (
    <div>
      {showNotification && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: 'lightblue',
            padding: 10,
            borderRadius: 5,
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            zIndex: 9999,
          }}
        >
          <p>Опеределять местопопложение автоматически?</p>
          <button onClick={() => handleAnswer(true)}>Да</button>
          <button onClick={() => handleAnswer(false)}>Нет</button>
        </div>
      )}
    </div>
  );
}