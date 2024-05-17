const sql = require('better-sqlite3');
const db = sql('meals.db');

const dummyMeals = [
  {
    title: 'Juicy Cheese Burger',
    slug: 'juicy-cheese-burger',
    image: 'https://res.cloudinary.com/dt1ftzn9d/image/upload/v1715972435/ehhdorprlx4xe08xml6z.jpg',
    summary:
      'A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.',
    instructions: `
      1. Prepare the patty:
         Mix 200g of ground beef with salt and pepper. Form into a patty.<br />

      2. Cook the patty:
         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.<br />

      3. Assemble the burger:
         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.<br />

      4. Serve:
         Complete the assembly with the top bun and serve hot.<br />
    `,
    creator: 'John Doe',
    creator_email: 'johndoe@example.com',
  },
  {
    title: 'Spicy Curry',
    slug: 'spicy-curry',
    image: 'https://res.cloudinary.com/dt1ftzn9d/image/upload/v1715972434/qkg4zoglnbdcrxdecoom.jpg',
    summary:
      'A rich and spicy curry, infused with exotic spices and creamy coconut milk.',
    instructions: `
      1. Chop vegetables:
         Cut your choice of vegetables into bite-sized pieces.<br />

      2. Sauté vegetables:
         In a pan with oil, sauté the vegetables until they start to soften.<br />

      3. Add curry paste:
         Stir in 2 tablespoons of curry paste and cook for another minute.<br />

      4. Simmer with coconut milk:
         Pour in 500ml of coconut milk and bring to a simmer. Let it cook for about 15 minutes.<br />

      5. Serve:
         Enjoy this creamy curry with rice or bread.
    `,
    creator: 'Max Schwarz',
    creator_email: 'max@example.com',
  },
  {
    title: 'Homemade Dumplings',
    slug: 'homemade-dumplings',
    image: 'https://res.cloudinary.com/dt1ftzn9d/image/upload/v1715972434/lppqpstsp0krnyrn2qec.jpg',
    summary:
      'Tender dumplings filled with savory meat and vegetables, steamed to perfection.',
    instructions: `
      1. Prepare the filling:
         Mix minced meat, shredded vegetables, and spices.<br />

      2. Fill the dumplings:
         Place a spoonful of filling in the center of each dumpling wrapper. Wet the edges and fold to seal.<br />

      3. Steam the dumplings:
         Arrange dumplings in a steamer. Steam for about 10 minutes.<br />

      4. Serve:
         Enjoy these dumplings hot, with a dipping sauce of your choice.<br />
    `,
    creator: 'Emily Chen',
    creator_email: 'emilychen@example.com',
  },
  {
    title: 'Classic Mac n Cheese',
    slug: 'classic-mac-n-cheese',
    image: 'https://res.cloudinary.com/dt1ftzn9d/image/upload/v1715972435/trjubgbyxmg76zwazjvm.jpg',
    summary:
      "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
    instructions: `
      1. Cook the macaroni:
         Boil macaroni according to package instructions until al dente.<br />

      2. Prepare cheese sauce:
         In a saucepan, melt butter, add flour, and gradually whisk in milk until thickened. Stir in grated cheese until melted.<br />

      3. Combine:
         Mix the cheese sauce with the drained macaroni.<br />

      4. Bake:
         Transfer to a baking dish, top with breadcrumbs, and bake until golden.<br />

      5. Serve:
         Serve hot, garnished with parsley if desired.<br />
    `,
    creator: 'Laura Smith',
    creator_email: 'laurasmith@example.com',
  },
  {
    title: 'Authentic Pizza',
    slug: 'authentic-pizza',
    image: 'https://res.cloudinary.com/dt1ftzn9d/image/upload/v1715972435/ilhxe6usfdxhrq4hos8r.jpg',
    summary:
      'Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.',
    instructions: `
      1. Prepare the dough:
         Knead pizza dough and let it rise until doubled in size.<br />

      2. Shape and add toppings:
         Roll out the dough, spread tomato sauce, and add your favorite toppings and cheese.<br />

      3. Bake the pizza:
         Bake in a preheated oven at 220°C for about 15-20 minutes.<br />

      4. Serve:
         Slice hot and enjoy with a sprinkle of basil leaves.<br />
    `,
    creator: 'Mario Rossi',
    creator_email: 'mariorossi@example.com',
  },
  {
    title: 'Wiener Schnitzel',
    slug: 'wiener-schnitzel',
    image: 'https://res.cloudinary.com/dt1ftzn9d/image/upload/v1715972436/ddhdcfqeoue6ons8ux41.jpg',
    summary:
      'Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.',
    instructions: `
      1. Prepare the veal:
         Pound veal cutlets to an even thickness.<br />

      2. Bread the veal:
         Coat each cutlet in flour, dip in beaten eggs, and then in breadcrumbs.<br />

      3. Fry the schnitzel:
      Heat oil in a pan and fry each schnitzel until golden brown on both sides.<br />

      4. Serve:
      Serve hot with a slice of lemon and a side of potato salad or greens.<br />
 `,
    creator: 'Franz Huber',
    creator_email: 'franzhuber@example.com',
  },
  {
    title: 'Fresh Tomato Salad',
    slug: 'fresh-tomato-salad',
    image: 'https://res.cloudinary.com/dt1ftzn9d/image/upload/v1715972436/fdqdfcujp1cs3pitjmxw.jpg',
    summary:
      'A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.',
    instructions: `
      1. Prepare the tomatoes:
        Slice fresh tomatoes and arrange them on a plate.
        <br />
      2. Add herbs and seasoning:
         Sprinkle chopped basil, salt, and pepper over the tomatoes.
         <br />
      3. Dress the salad:
         Drizzle with olive oil and balsamic vinegar.
         <br />
      4. Serve:
         Enjoy this simple, flavorful salad as a side dish or light meal.
    `,
    creator: 'Sophia Green',
    creator_email: 'sophiagreen@example.com',
  },
];

db.prepare(`
   CREATE TABLE IF NOT EXISTS meals (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
    )
`).run();

async function initData() {
  const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `);

  for (const meal of dummyMeals) {
    stmt.run(meal);
  }
}

initData();