import { AnchoredMenu } from '@/components/shadcn/anchored-menu'

function StyledMenu({ handleMenuClose, anchorEl, itemComponents = [] }) {
  return (
    <AnchoredMenu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMenuClose} align="center">
      {itemComponents.map((item, index) => (
        <div key={index} role="menuitem" className="geode-menu-item" onClick={item.onClick}>
          {item.content()}
        </div>
      ))}
    </AnchoredMenu>
  )
}

export default StyledMenu
