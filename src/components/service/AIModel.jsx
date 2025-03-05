import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  




  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   }); 
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "application/json",
//   };
  
//   export const chatSession = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: "user",
//           parts: [
//             {text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format"},
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {text: "```json\n{\n  \"hotel_options\": [\n    {\n      \"name\": \"The D Las Vegas\",\n      \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"from $35/night\",\n      \"image_url\": \"https://www.thedorleans.com/media/images/hero-images/hero-home-new.jpg\",\n      \"geo_coordinates\": \"36.1696,-115.1420\",\n      \"rating\": \"4.0 stars\",\n      \"description\": \"Located in the heart of Downtown Las Vegas, The D is a budget-friendly option with a retro vibe. It offers a casino, multiple dining options, and a rooftop pool.\"\n    },\n    {\n      \"name\": \"Circus Circus Hotel & Casino\",\n      \"address\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"from $40/night\",\n      \"image_url\": \"https://media.cntraveler.com/photos/5e3c1834794e280008b6420d/master/pass/circus-circus-hotel-and-casino-las-vegas-01.jpg\",\n      \"geo_coordinates\": \"36.1183,-115.1694\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"Known for its circus-themed attractions, Circus Circus offers a family-friendly atmosphere with affordable accommodations, a large casino, and a midway with carnival games.\"\n    },\n    {\n      \"name\": \"Golden Nugget Hotel & Casino\",\n      \"address\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"from $50/night\",\n      \"image_url\": \"https://www.goldennugget.com/las-vegas/images/hero-image-las-vegas-hotel.jpg\",\n      \"geo_coordinates\": \"36.1684,-115.1419\",\n      \"rating\": \"4.5 stars\",\n      \"description\": \"A historic and glamorous hotel located on Fremont Street, Golden Nugget boasts a world-class casino, multiple restaurants, a large pool complex, and a shark tank.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1\",\n      \"plan\": [\n        {\n          \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n          \"place\": \"Fremont Street Experience\",\n          \"details\": \"Explore the vibrant Fremont Street Experience, a pedestrian mall with live music, street performers, and the famous Viva Vision light show.\",\n          \"image_url\": \"https://www.visitlasvegas.com/media/2015/11/Fremont-Street-Experience.jpg\",\n          \"geo_coordinates\": \"36.1696,-115.1420\",\n          \"ticket_pricing\": \"Free\",\n          \"rating\": \"4.5 stars\"\n        },\n        {\n          \"time\": \"Afternoon (12:00 PM - 3:00 PM)\",\n          \"place\": \"Pinball Hall of Fame\",\n          \"details\": \"Play classic pinball machines from all eras at the Pinball Hall of Fame, a fun and nostalgic experience.\",\n          \"image_url\": \"https://www.pinballhalloffame.org/img/slideshow/slider_img_02.jpg\",\n          \"geo_coordinates\": \"36.1708,-115.1434\",\n          \"ticket_pricing\": \"$15 per person\",\n          \"rating\": \"4.0 stars\"\n        },\n        {\n          \"time\": \"Evening (7:00 PM - 10:00 PM)\",\n          \"place\": \"The Neon Museum\",\n          \"details\": \"Take a guided tour of the Neon Museum, a collection of iconic Las Vegas signs from the past.\",\n          \"image_url\": \"https://www.neonmuseum.org/wp-content/uploads/2018/12/NEON-MUSEUM-LAS-VEGAS-SIGN-TOUR-IMAGE.jpg\",\n          \"geo_coordinates\": \"36.1745,-115.1443\",\n          \"ticket_pricing\": \"$25 per person\",\n          \"rating\": \"4.5 stars\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"plan\": [\n        {\n          \"time\": \"Morning (10:00 AM - 1:00 PM)\",\n          \"place\": \"Hoover Dam\",\n          \"details\": \"Take a day trip to Hoover Dam, an engineering marvel and a popular tourist destination.\",\n          \"image_url\": \"https://www.nps.gov/articles/000/images/hoover-dam_06.jpg\",\n          \"geo_coordinates\": \"36.0288,-114.9667\",\n          \"ticket_pricing\": \"Free admission\",\n          \"rating\": \"4.5 stars\"\n        },\n        {\n          \"time\": \"Afternoon (2:00 PM - 5:00 PM)\",\n          \"place\": \"Red Rock Canyon National Conservation Area\",\n          \"details\": \"Hike or drive through the stunning Red Rock Canyon, offering beautiful rock formations and scenic views.\",\n          \"image_url\": \"https://www.nps.gov/articles/000/images/red-rock-canyon-01.jpg\",\n          \"geo_coordinates\": \"36.1000,-115.2500\",\n          \"ticket_pricing\": \"$15 per vehicle\",\n          \"rating\": \"4.5 stars\"\n        },\n        {\n          \"time\": \"Evening (7:00 PM - 10:00 PM)\",\n          \"place\": \"Free Show on the Strip\",\n          \"details\": \"Catch a free show on the Las Vegas Strip, such as the Bellagio Fountains or the volcano at the Mirage.\",\n          \"image_url\": \"https://www.bellagio.com/content/dam/mgmresorts/bellagio/images/bellagio-fountains-hero-mobile.jpg\",\n          \"geo_coordinates\": \"36.1140,-115.1720\",\n          \"ticket_pricing\": \"Free\",\n          \"rating\": \"4.5 stars\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"plan\": [\n        {\n          \"time\": \"Morning (10:00 AM - 12:00 PM)\",\n          \"place\": \"The LINQ Promenade\",\n          \"details\": \"Stroll along the LINQ Promenade, a shopping and dining area with a High Roller observation wheel.\",\n          \"image_url\": \"https://www.caesars.com/content/dam/caesars/linq/images/hero-image-linq-promenade-mobile.jpg\",\n          \"geo_coordinates\": \"36.1166,-115.1709\",\n          \"ticket_pricing\": \"From $25 for the High Roller\",\n          \"rating\": \"4.0 stars\"\n        },\n        {\n          \"time\": \"Afternoon (12:00 PM - 3:00 PM)\",\n          \"place\": \"The Mob Museum\",\n          \"details\": \"Learn about the history of organized crime in Las Vegas at the Mob Museum, a fascinating and interactive experience.\",\n          \"image_url\": \"https://www.themobmuseum.org/media/images/hero/mob-museum-exterior-1200x560-2022-08-03_11-49-03.jpg\",\n          \"geo_coordinates\": \"36.1690,-115.1438\",\n          \"ticket_pricing\": \"$25 per person\",\n          \"rating\": \"4.5 stars\"\n        },\n        {\n          \"time\": \"Evening (7:00 PM - 10:00 PM)\",\n          \"place\": \"Buffet Dinner\",\n          \"details\": \"Enjoy a budget-friendly buffet dinner at one of the many casinos on the Strip.\",\n          \"image_url\": \"https://www.caesars.com/content/dam/caesars/paris/images/restaurants/buffet-paris.jpg\",\n          \"geo_coordinates\": \"36.1140,-115.1720\",\n          \"ticket_pricing\": \"Varies by casino and buffet\",\n          \"rating\": \"4.0 stars\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Notes:**\n\n* This itinerary is just a suggestion, you can customize it based on your interests and preferences.\n* Be sure to check the opening hours and ticket prices for each attraction before visiting.\n* You can find affordable dining options in Downtown Las Vegas and off the Strip.\n* Consider using public transportation or ride-sharing services to save money on transportation costs.\n\n**For more details about each attraction and to find updated prices, please visit their official websites.**\n"},
//           ],
//         },
//       ],
//     });