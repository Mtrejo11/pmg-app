import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ArrowIcon: React.FC<{
  width?: number;
  height?: number;
  color?: string;
}> = ({
  width = 42,
  height = 42,
  color = "#fff",
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 42 42"
    fill="none"
    stroke={color}
  >
    <Path d="M16 32l12-12-12-12" strokeWidth={4}/>
  </Svg>
)
export default ArrowIcon
