import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}

