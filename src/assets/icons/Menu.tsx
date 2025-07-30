import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

interface MenuIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const MenuIcon: React.FC<MenuIconProps> = ({
  width = 25,
  height = 21,
  color = "#fff",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      stroke="rgba(255, 255, 255, 1)"
    >
      <G strokeWidth={3} clipPath="url(#a)">
        <Path d="M0 1.894h25.744M11.191 9.942h14.551M0 9.942h7.835M0 17.987h25.744" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h25v21H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default MenuIcon;
