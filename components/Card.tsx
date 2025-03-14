import React from "react";

type CardProps = {
  title: string;
  content: string;
};

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-300">{content}</p>
    </div>
  );
};

export default Card;
