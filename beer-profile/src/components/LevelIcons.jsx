const SPRITE = '/levels/레벨 사진.png';

// Image layout: 3 cols × 4 rows
// Row 0: glass | mug | craft-keg
// Row 1: can   | metal-keg | ferm-tank
// Row 2: barrel | (empty) | silos
// Row 3: tank truck (full width)
//
// background-size: 300% 400% → each cell shows exactly 1/3 × 1/4 of the image
// background-position: col→(0%|50%|100%), row→(0%|33.33%|66.67%|100%)

// Image: 1024×1536 — 3 cols, ~4 rows
// Displayed at background-size: 300% auto → 168×252px in a 56px container
// Row y-offsets (approx): row0=0%, row1=34%, row2=68%, row3=100%
function SpriteIcon({ bx, by, size = 56 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url('${SPRITE}')`,
        backgroundSize: '300% auto',
        backgroundPosition: `${bx}% ${by}%`,
        backgroundRepeat: 'no-repeat',
        borderRadius: 8,
      }}
    />
  );
}

export function IconBarGlass()    { return <SpriteIcon bx={0}   by={0}  />; } // Lv.1
export function IconPintCan()     { return <SpriteIcon bx={0}   by={34} />; } // Lv.2
export function IconMass()        { return <SpriteIcon bx={50}  by={0}  />; } // Lv.3
export function IconCraftKeg()    { return <SpriteIcon bx={100} by={0}  />; } // Lv.4
export function IconBarKeg()      { return <SpriteIcon bx={50}  by={34} />; } // Lv.5
export function IconHectoliter()  { return <SpriteIcon bx={100} by={34} />; } // Lv.6
export function IconUSBarrel()    { return <SpriteIcon bx={0}   by={68} />; } // Lv.7
export function IconTankTruck()   { return <SpriteIcon bx={50}  by={100}/>; } // Lv.8
export function IconFactoryTank() { return <SpriteIcon bx={100} by={68} />; } // Lv.9

export const LEVEL_ICONS = [
  IconBarGlass,
  IconPintCan,
  IconMass,
  IconCraftKeg,
  IconBarKeg,
  IconHectoliter,
  IconUSBarrel,
  IconTankTruck,
  IconFactoryTank,
];
