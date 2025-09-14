import React from "react";
import { Card, Title, List, ItemButton, IconWrap, Label, Badge } from "./StyledSidebarNav.js";

export default function SidebarNav({ title = "Categories", items = [], activeId, onSelect }) {
  return (
    <Card role="navigation" aria-label={title}>
      <Title>{title}</Title>
      <List>
        {items.map(item => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <ItemButton $active={active} onClick={() => onSelect?.(item.id)} aria-current={active ? "true" : undefined}>
                <IconWrap $active={active}>{item.icon}</IconWrap>
                <Label>{item.label}</Label>
                {typeof item.count === "number" && <Badge>{item.count}</Badge>}
              </ItemButton>
            </li>
          );
        })}
      </List>
    </Card>
  );
}
