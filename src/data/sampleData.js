export const sampleData = {
  ecommerce: [
    {
      "order_id": "ORD-1001",
      "customer": {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "address": {
          "street": "123 Main St",
          "city": "New York",
          "zip": "10001"
        }
      },
      "items": [
        { "product_id": "P-001", "name": "Wireless Headphones", "price": 199.99, "qty": 1 },
        { "product_id": "P-002", "name": "Laptop Stand", "price": 49.99, "qty": 1 }
      ],
      "total": 249.98,
      "status": "Shipped",
      "date": "2023-10-15T10:30:00Z"
    },
    {
      "order_id": "ORD-1002",
      "customer": {
        "name": "John Smith",
        "email": "john@test.com",
        "address": {
          "street": "456 Oak Ave",
          "city": "San Francisco",
          "zip": "94105"
        }
      },
      "items": [
        { "product_id": "P-003", "name": "Mechanical Keyboard", "price": 129.50, "qty": 1 }
      ],
      "total": 129.50,
      "status": "Processing",
      "date": "2023-10-16T14:15:00Z"
    }
  ],
  api_users: [
    {
      "id": 1,
      "username": "bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": { "lat": "-37.3159", "lng": "81.1496" }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "username": "antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": { "lat": "-43.9509", "lng": "-34.4618" }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    }
  ],
  analytics: [
    {
      "page_path": "/home",
      "views": 15430,
      "unique_visitors": 12000,
      "avg_time_on_page": 45.3,
      "bounce_rate": 0.35,
      "source": { "direct": 5000, "organic": 8000, "referral": 2430 }
    },
    {
      "page_path": "/pricing",
      "views": 8200,
      "unique_visitors": 4500,
      "avg_time_on_page": 80.5,
      "bounce_rate": 0.25,
      "source": { "direct": 2000, "organic": 5500, "referral": 700 }
    },
    {
      "page_path": "/blog/ai-trends",
      "views": 25000,
      "unique_visitors": 22000,
      "avg_time_on_page": 120.0,
      "bounce_rate": 0.65,
      "source": { "direct": 1000, "organic": 18000, "social": 6000 }
    }
  ]
};
