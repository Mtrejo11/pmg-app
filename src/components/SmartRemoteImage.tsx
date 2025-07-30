import { Image, Text, ActivityIndicator, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useEffect, useState } from "react";

export const SmartRemoteImage = ({
  image,
  fallbackText,
  style,
}: {
  image?: { url: string; contentType?: string } | string;
  fallbackText?: string;
  style?: any;
}) => {
  const [svgXml, setSvgXml] = useState<string | null>(null);

  const url = typeof image === "string" ? image : image?.url;
  const contentType =
    typeof image === "string"
      ? image.endsWith(".svg")
        ? "image/svg+xml"
        : undefined
      : image?.contentType;

  const isSvg =
    contentType?.includes("svg") || url?.toLowerCase().endsWith(".svg");

  useEffect(() => {
    if (isSvg && url) {
      fetch(url)
        .then((res) => res.text())
        .then(setSvgXml)
        .catch((e) => {
          console.error("SVG fetch failed", e);
        });
    }
  }, [url]);

  if (!url && fallbackText) {
    return <Text style={style}>{fallbackText}</Text>;
  }

  if (isSvg) {
    return svgXml ? (
      <SvgXml xml={svgXml} style={style} />
    ) : (
      <ActivityIndicator />
    );
  }

  return <Image source={{ uri: url }} style={style} resizeMode="contain" />;
};
