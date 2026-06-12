// 레벨별 개별 이미지 (public/levels/level1.png ~ level9.png)
// Lv1 식당 맥주잔 / Lv2 500ml 캔 / Lv3 마스 / Lv4 수제맥주 케그 / Lv5 호프집 케그
// Lv6 헥토리터(발효탱크) / Lv7 양조 배럴 / Lv8 맥주 탱크로리 / Lv9 공장 저장 탱크
function LevelImage({ level, size = 56 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        flexShrink: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={`/levels/level${level}.png`}
        alt=""
        draggable="false"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </div>
  );
}

export function IconBarGlass({ size } = {})    { return <LevelImage level={1} size={size} />; }
export function IconPintCan({ size } = {})     { return <LevelImage level={2} size={size} />; }
export function IconMass({ size } = {})        { return <LevelImage level={3} size={size} />; }
export function IconCraftKeg({ size } = {})    { return <LevelImage level={4} size={size} />; }
export function IconBarKeg({ size } = {})      { return <LevelImage level={5} size={size} />; }
export function IconHectoliter({ size } = {})  { return <LevelImage level={6} size={size} />; }
export function IconUSBarrel({ size } = {})    { return <LevelImage level={7} size={size} />; }
export function IconTankTruck({ size } = {})   { return <LevelImage level={8} size={size} />; }
export function IconFactoryTank({ size } = {}) { return <LevelImage level={9} size={size} />; }

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
