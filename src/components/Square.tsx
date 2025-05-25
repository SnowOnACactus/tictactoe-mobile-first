type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
  style?: React.CSSProperties;
  isMobile?: boolean;
}

export function Square({ value, onSquareClick, style, isMobile = false }: SquareProps) {
  return (
    <button 
      className={`square ${isMobile ? 'mobile' : ''}`}
      onClick={onSquareClick}
      style={style}
    >
      {value}
    </button>
  );
}