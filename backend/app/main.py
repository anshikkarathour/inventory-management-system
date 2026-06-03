from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order
from app.models.order_item import OrderItem

from app.routes.product import router as product_router
from app.routes.customer import router as customer_router
from app.routes.order import router as order_router
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://inventory-management-system-fztq.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)


@app.get("/")
def home():
    return {"message": "Inventory API Running"}