from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/orders")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):

    total_amount = 0

    # check customer_id exists implicitly (you can improve later)
    
    new_order = Order(customer_id=order.customer_id, total_amount=0)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        if product.quantity < item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name}")

        # reduce stock
        product.quantity -= item.quantity

        item_total = product.price * item.quantity
        total_amount += item_total

        order_item = OrderItem(
            order_id=new_order.id,
            product_id=product.id,
            quantity=item.quantity,
            price=product.price
        )

        db.add(order_item)

    new_order.total_amount = total_amount

    db.commit()
    db.refresh(new_order)

    return new_order


@router.get("/orders")
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()