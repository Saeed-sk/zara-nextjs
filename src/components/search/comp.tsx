'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <motion.div
      >
        <motion.span
          key={count} // کلید منحصربه‌فرد برای هر عدد
          initial={{ y: -20, opacity: 0 }} // حالت اولیه
          animate={{ y: 0, opacity: 1 }} // حالت نهایی
          transition={{ duration: 0.3 }} // مدت زمان انیمیشن
        >
          {count}
        </motion.span>
      </motion.div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
};

export default AnimatedCounter;
