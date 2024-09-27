import React from "react";

export const Spacer: React.FC<{ flex?: number }> = ({ flex = 1 }) => (
  <div style={{ flex: flex }} />
);
