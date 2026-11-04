# Hafiz Milk Shop — Owner's Website Guide
### A Plain-Language Guide for Managing Your New Website

---

### 1. What This Website Does for Your Shop
This website is built to turn your family's 98-year reputation in Garhi Shahu into regular, high-paying orders from across Pakistan. When someone in Karachi, Islamabad, or anywhere in the country searches for pure desi ghee or butter, they will land on this page and immediately see that you have been in business since 1928, have hundreds of 5-star Google reviews, and deliver by courier with Cash on Delivery. In less than 10 seconds, a visitor can click one button to send you a complete order message directly on your WhatsApp or tap to call your counter. Local customers in Lahore can quickly see your shop hours and get Google Maps driving directions right to your door.

---

### 2. What Each Part of the Page Is For
Here is a quick tour of your website from top to bottom, explaining why each section was designed the way it is:

- **The Top Black Bar**: Shows your two phone numbers, your WhatsApp button, today's opening hours, and an easy button to switch between English and Urdu. Visitors can tap your phone number on their smartphone and call your counter in one touch.
- **The Ledger Side Rail (Desktop)**: On computer screens, a narrow index strip stays visible on the side marked 01 to 08, styled like an old shop bahi-khata. It lets people jump straight to prices, your history, or how to order.
- **The Main Screen (Hero)**: Features a large "1928" watermark, a clear statement that your shop has been serving pure ghee and butter from Lahore for nearly a century, and three key facts: serving since 1928, 4.2 rating on Google with 534 reviews, and Cash on Delivery nationwide.
- **The Shop Ledger & Price List**: Styled like a traditional paper ledger with dotted lines leading from each item to its price in Pakistani Rupees (PKR). Pure ghee and butter show a "Nationwide COD" tag with pre-filled WhatsApp order buttons. Fresh milk, dahi, and zafrani kheer are marked as Lahore counter items.
- **Our Story (1928 to Today)**: Simple, dated rows that show how your shop began on Allama Iqbal Road in 1928, how your slow-cooking kadai method was perfected, and how you now ship across Pakistan. This proves to out-of-city buyers that you are a genuine heritage family shop.
- **How to Order Nationwide**: Looks like a physical receipt slip. It explains in 4 simple steps how customers message your WhatsApp, confirm their parcel weight and address, receive their sealed tin via courier, and pay cash at their front door. It also lists estimated courier times and rates for major cities.
- **Packaging and Purity Rules**: Clearly explains how your ghee is slowly clarified in iron woks, why it stays fresh for 12 months without chemical preservatives, and how each tin is sealed tight inside a cardboard box so it cannot leak during travel.
- **Customer Words (Reviews)**: Shows your 4.2 Google rating prominently alongside real quotes from actual customers in Lahore, Islamabad, and Karachi who praise your ghee's aroma and fast delivery.
- **Common Questions (FAQ)**: Answers the 6 most common questions customers ask on the phone, such as delivery times, how Cash on Delivery works, shelf life, and leak-proof packaging.
- **Visit Us in Garhi Shahu**: An interactive Google Map, your full address (56 Allama Iqbal Road), your daily opening hours (6:00 AM to 11:30 PM), and driving directions for walk-in customers.
- **Floating WhatsApp Button**: A green button stays in the bottom corner of the screen at all times. No matter where a customer scrolls, they can tap it to send you a message.

---

### 3. How Customers Will Order From You
Customers have three easy ways to buy:
1. **WhatsApp Orders (Most Common)**: When a customer clicks any "Order on WhatsApp" button next to a product, their WhatsApp opens with a pre-written message:
   *"Hello Hafiz Milk Shop, I would like to order Pure Desi Ghee (1 kg Tin) via Cash on Delivery. Please confirm courier charges..."*
   All you need to do is reply with your courier timing and confirm their delivery address.
2. **Phone Calls**: By clicking any phone number on the page, their phone dials your counter lines (+92 322 4111063 or +92 344 4018042) directly.
3. **Counter Visits**: Customers in Lahore can click "Get Driving Directions" to open Google Maps on their phone and navigate directly to your shop in Garhi Shahu.

---

### 4. What You Can Change Yourself
All your shop's information (phone numbers, prices, opening hours, product sizes, and reviews) is kept in **one single file** called `site-data.json`. 

You or anyone who knows basic typing can open that file in Notepad and change:
- **Your Prices**: If the market price of ghee or butter changes, simply change the number next to `"pricePkr"`.
- **Your Phone Numbers**: Change the phone digits in the `"phones"` section.
- **Your Hours**: If you change your opening or closing hours during Ramadan or winter, update the `"hours"` section.
- **Delivery Charges**: Update the courier rates for each city in the `"cities"` list.

> **Important Safety Note**: Do not delete the quotation marks or commas in that file. If you are not comfortable making changes yourself, simply write your new prices or phone numbers on a piece of paper or send a voice note to your developer, and they can update it for you in two minutes.

---

### 5. About the Pictures on the Website
Right now, the website uses clean, realistic computer-rendered placeholder images that follow strict photography rules (natural window light, traditional Punjabi brass utensils, rustic wood counters, and real food textures). 

**When you are ready, replace these with real photos of your own shop:**
- Take high-resolution photos of your packaged ghee tins, fresh white butter on greaseproof paper, kheer in clay bowls, and your iron kadai cooking.
- Take photos in good daylight (morning sun is best). Avoid camera flash.
- **Never take photos of random customers or staff without permission.**
- Send the pictures to your developer over WhatsApp as **Document** files (so WhatsApp does not compress them or lower their quality). Your developer will format them and drop them into the website immediately.

---

### 6. What We Need From You (Checklist)
To make your website 100% complete with final details, please provide your developer with:
- [ ] Your exact current retail prices for 1kg, 2kg, and 5kg Desi Ghee tins.
- [ ] Your current prices for 500g and 1kg Desi Butter.
- [ ] The courier services you prefer to use (e.g. TCS, Leopards, Trax, PostEx).
- [ ] 2 to 3 short family history milestones (the year your grandfather or father took over, or special events).
- [ ] High-quality photos of your actual packaged ghee tins and butter boxes.

---

### 7. Questions Owners Usually Ask

**Q: How much does this website cost to keep running every month?**
**A:** This website is built as a lightweight, static page. It can be hosted on fast global services (like Cloudflare Pages or Netlify) for **free or under $5/year**. Your only ongoing cost is your domain name (e.g., `hafizmilkshop.com`), which costs approximately 3,500 to 4,500 PKR per year.

**Q: Do I need an expensive merchant bank account or card payment machine?**
**A:** No. In Pakistan, over 85% of online food and dairy orders are paid through Cash on Delivery. Customers trust Cash on Delivery because they pay only when the parcel arrives in their hands. You do not need any merchant bank fees or complex software.

**Q: How do people find this website on Google?**
**A:** The website includes built-in Google business tags (Schema.org code) that tell Google your exact address in Garhi Shahu, your 4.2 rating, your phone numbers, and that you sell pure desi ghee. When local customers search for "Desi Ghee Garhi Shahu" or "Pure Butter Lahore", Google will recommend your page.

**Q: Who updates the website if I want to add a new product?**
**A:** You can send a quick WhatsApp message to your developer with the product name and price, and they can add it to `site-data.json` within minutes.

