import { TripFormData, Itinerary } from "../types";

const morningActivities = [
  "Start the day with a local coffee and fresh pastries.",
  "Enjoy a guided walking tour of the historical center.",
  "Visit the main museum to learn about local culture.",
  "Take a scenic morning hike to enjoy the sunrise.",
  "Explore the bustling local farmers' market."
];

const afternoonActivities = [
  "Have lunch at a highly-rated local restaurant.",
  "Visit the central park and enjoy a relaxing boat ride.",
  "Explore the artisan shops and buy souvenirs.",
  "Take a cooking class to learn regional dishes.",
  "Enjoy a hop-on hop-off bus tour around the city landmarks."
];

const eveningActivities = [
  "Dine at a spectacular rooftop restaurant with city views.",
  "Experience the local nightlife and street food.",
  "Watch a live theater performance or cultural show.",
  "Take a relaxing evening stroll along the waterfront.",
  "Enjoy a sunset cruise with dinner included."
];

function getRandomActivity(activities: string[]) {
  return activities[Math.floor(Math.random() * activities.length)];
}

export async function generateItinerary(data: TripFormData): Promise<Itinerary> {
  // Simulate network delay to make it feel like a real generation process
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const tripTitle = `${data.type} Trip to ${data.destination}`;
  const days = [];

  for (let i = 1; i <= data.days; i++) {
    days.push({
      day: i,
      morning: getRandomActivity(morningActivities),
      afternoon: getRandomActivity(afternoonActivities),
      evening: getRandomActivity(eveningActivities)
    });
  }

  return {
    tripTitle,
    days
  };
}
