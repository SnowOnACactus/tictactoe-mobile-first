type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
  style?: React.CSSProperties;
}

export function Square({ value, onSquareClick, style }: SquareProps) {
  return (
    <button 
      className="square"
      onClick={onSquareClick}
      style={style}
    >
      {value}
    </button>
  );
}