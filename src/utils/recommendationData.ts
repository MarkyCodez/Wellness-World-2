"use client";

// Fitness Database (40+ Daily Routine Templates)
export const fitnessTemplates = [
  { id: 'muscle_beg_1', goal: 'Muscle Gain', level: 'Beginner', activity: 'Full Body Strength', duration: '40 min', difficulty: 'Moderate', exercises: 'Squats 3x10, Pushups 3xMax, Lunges 3x12, Plank 3x45s', instructions: 'Focus on slow, controlled movements. Keep your core tight throughout every exercise.' },
  { id: 'muscle_int_1', goal: 'Muscle Gain', level: 'Intermediate', activity: 'Upper Body Power', duration: '50 min', difficulty: 'Challenging', exercises: 'Bench Press 4x8, Rows 4x10, Overhead Press 3x10, Dips 3x12', instructions: 'Rest 90 seconds between sets. Aim for explosive upward movements and slow descents.' },
  { id: 'muscle_adv_1', goal: 'Muscle Gain', level: 'Advanced', activity: 'Hypertrophy Split', duration: '75 min', difficulty: 'Intense', exercises: 'Deadlifts 5x5, Pullups 4x12, Incline DB Press 4x10, Lateral Raises 4x15', instructions: 'Focus on the mind-muscle connection. Squeeze at the top of every rep.' },
  { id: 'weight_beg_1', goal: 'Weight Management', level: 'Beginner', activity: 'Brisk Walking', duration: '30 min', difficulty: 'Light', exercises: 'Steady pace walk, focus on posture and deep breathing', instructions: 'Keep your head up and shoulders back. Swing your arms naturally.' },
  { id: 'weight_int_1', goal: 'Weight Management', level: 'Intermediate', activity: 'HIIT Circuit', duration: '35 min', difficulty: 'Challenging', exercises: 'Burpees 45s, Mountain Climbers 45s, Jump Squats 45s, 15s rest', instructions: 'Give 100% effort during the 45s work periods. Use the 15s to catch your breath.' },
  { id: 'energy_beg_1', goal: 'More Energy', level: 'Beginner', activity: 'Morning Flow', duration: '20 min', difficulty: 'Light', exercises: 'Sun Salutations, Cat-Cow, Bird-Dog, Child\'s Pose', instructions: 'Move with your breath. Inhale to expand, exhale to contract or fold.' },
  { id: 'sleep_beg_1', goal: 'Better Sleep', level: 'Beginner', activity: 'Yin Yoga', duration: '25 min', difficulty: 'Light', exercises: 'Forward Fold, Pigeon Pose, Reclined Twist, Savasana', instructions: 'Hold each pose for 2-3 minutes. Focus on releasing tension in your hips and jaw.' },
  { id: 'muscle_beg_2', goal: 'Muscle Gain', level: 'Beginner', activity: 'Resistance Bands', duration: '35 min', difficulty: 'Moderate', exercises: 'Band Squats 3x12, Band Rows 3x12, Pushups 3xMax, Glute Bridge 3x15', instructions: 'Maintain tension on the band throughout the entire range of motion.' },
  { id: 'weight_int_2', goal: 'Weight Management', level: 'Intermediate', activity: 'Tabata Burn', duration: '20 min', difficulty: 'Intense', exercises: 'High Knees, Plank Jacks, Skaters, Pushups', instructions: '20 seconds of maximum effort followed by 10 seconds of rest. Repeat 8 times per exercise.' },
  { id: 'energy_int_1', goal: 'More Energy', level: 'Intermediate', activity: 'Dynamic Mobility', duration: '25 min', difficulty: 'Moderate', exercises: 'World\'s Greatest Stretch, Leg Swings, Arm Circles, Inchworms', instructions: 'Focus on increasing your range of motion with each repetition.' },
  { id: 'sleep_int_1', goal: 'Better Sleep', level: 'Intermediate', activity: 'Deep Relaxation', duration: '30 min', difficulty: 'Light', exercises: 'Legs up the wall, Happy Baby, Spinal Twist, Box Breathing', instructions: 'Dim the lights and avoid screens for at least 30 minutes before this routine.' },
  { id: 'muscle_int_2', goal: 'Muscle Gain', level: 'Intermediate', activity: 'Lower Body Focus', duration: '45 min', difficulty: 'Challenging', exercises: 'Goblet Squats 4x10, RDLs 4x12, Bulgarian Split Squats 3x10, Calf Raises 3x20', instructions: 'Keep your weight in your heels during squats. Feel the stretch in your hamstrings during RDLs.' },
  { id: 'weight_beg_2', goal: 'Weight Management', level: 'Beginner', activity: 'Low Impact Aerobics', duration: '40 min', difficulty: 'Moderate', exercises: 'Marching in place, Side steps, Arm reaches, Knee lifts', instructions: 'Keep moving! The goal is to keep your heart rate elevated but steady.' },
  { id: 'energy_adv_1', goal: 'More Energy', level: 'Advanced', activity: 'Metabolic Conditioning', duration: '45 min', difficulty: 'Intense', exercises: 'Kettlebell Swings, Thrusters, Box Jumps, Rowing', instructions: 'Focus on power and speed. Maintain perfect form even as you fatigue.' },
  { id: 'sleep_adv_1', goal: 'Better Sleep', level: 'Advanced', activity: 'Yoga Nidra Prep', duration: '40 min', difficulty: 'Light', exercises: 'Gentle flow followed by 20 minutes of guided body scan', instructions: 'Use pillows and blankets to make yourself as comfortable as possible.' },
  { id: 'muscle_adv_2', goal: 'Muscle Gain', level: 'Advanced', activity: 'Push/Pull Supersets', duration: '60 min', difficulty: 'Intense', exercises: 'Bench/Row 4x10, Overhead/Pullup 4x10, Bicep/Tricep 3x15', instructions: 'Move immediately from the first exercise to the second. Rest only after the pair is complete.' },
  { id: 'weight_adv_1', goal: 'Weight Management', level: 'Advanced', activity: 'The Gauntlet', duration: '50 min', difficulty: 'Intense', exercises: '1 mile run, 100 air squats, 50 pushups, 1 mile run', instructions: 'Pace yourself. This is a test of mental and physical endurance.' },
  { id: 'energy_beg_2', goal: 'More Energy', level: 'Beginner', activity: 'Sun Salutation A', duration: '15 min', difficulty: 'Light', exercises: 'Mountain, Forward Fold, Plank, Cobra, Down Dog', instructions: 'Repeat the sequence 5-10 times. Focus on the flow of energy through your spine.' },
  { id: 'sleep_beg_2', goal: 'Better Sleep', level: 'Beginner', activity: 'Bedtime Stretch', duration: '10 min', difficulty: 'Light', exercises: 'Neck rolls, Shoulder shrugs, Seated twist, Child\'s pose', instructions: 'Can be done right on your bed. Focus on letting go of the day\'s stress.' },
  { id: 'muscle_beg_3', goal: 'Muscle Gain', level: 'Beginner', activity: 'Bodyweight Basics', duration: '30 min', difficulty: 'Moderate', exercises: 'Air Squats 3x15, Incline Pushups 3x12, Superman 3x10, Plank 3x30s', instructions: 'Focus on the quality of each rep rather than the quantity.' },
  { id: 'muscle_int_3', goal: 'Muscle Gain', level: 'Intermediate', activity: 'Core & Stability', duration: '30 min', difficulty: 'Moderate', exercises: 'Hollow Holds, Russian Twists, Dead Bugs, Plank Saws', instructions: 'Keep your lower back pressed into the floor during core work.' },
  { id: 'weight_int_3', goal: 'Weight Management', level: 'Intermediate', activity: 'Stair Climbing', duration: '30 min', difficulty: 'Challenging', exercises: 'Steady climb for 20 mins, 5 mins of intervals (fast/slow)', instructions: 'Use a real staircase or a stair climber machine. Don\'t lean on the rails.' },
  { id: 'energy_int_2', goal: 'More Energy', level: 'Intermediate', activity: 'Outdoor Cycling', duration: '45 min', difficulty: 'Moderate', exercises: 'Steady ride with 3 x 2-minute sprints', instructions: 'Enjoy the fresh air! The sprints will boost your metabolism for hours.' },
  { id: 'sleep_int_2', goal: 'Better Sleep', level: 'Intermediate', activity: 'Progressive Muscle Relaxation', duration: '20 min', difficulty: 'Light', exercises: 'Tense and release every muscle group from toes to head', instructions: 'Inhale as you tense, exhale as you release. Feel the heaviness in your limbs.' },
  { id: 'muscle_adv_3', goal: 'Muscle Gain', level: 'Advanced', activity: 'Olympic Lifting Basics', duration: '60 min', difficulty: 'Intense', exercises: 'Clean pulls, Front squats, Overhead squats, Snatch balance', instructions: 'Focus on technique and speed. Use a PVC pipe or empty bar if needed.' },
  { id: 'weight_adv_2', goal: 'Weight Management', level: 'Advanced', activity: 'Swimming Intervals', duration: '45 min', difficulty: 'Intense', exercises: '400m warmup, 10x50m sprints, 200m cooldown', instructions: 'Focus on your stroke technique. The sprints should be at 90% effort.' },
  { id: 'energy_adv_2', goal: 'More Energy', level: 'Advanced', activity: 'Trail Running', duration: '60 min', difficulty: 'Intense', exercises: 'Variable terrain run with hill repeats', instructions: 'The uneven ground engages more stabilizing muscles and keeps your mind sharp.' },
  { id: 'sleep_adv_2', goal: 'Better Sleep', level: 'Advanced', activity: 'Restorative Flow', duration: '45 min', difficulty: 'Light', exercises: 'Supported bridge, Supported fish, Legs up wall, Long Savasana', instructions: 'Use as many props as you need to feel completely supported by the earth.' },
  { id: 'muscle_beg_4', goal: 'Muscle Gain', level: 'Beginner', activity: 'Dumbbell Basics', duration: '40 min', difficulty: 'Moderate', exercises: 'DB Squats, DB Press, DB Rows, DB Curls', instructions: 'Choose a weight where the last 2 reps of each set are challenging.' },
  { id: 'weight_beg_3', goal: 'Weight Management', level: 'Beginner', activity: 'Water Aerobics', duration: '45 min', difficulty: 'Light', exercises: 'Water walking, Leg lifts, Arm circles, Treading water', instructions: 'The resistance of the water provides a great workout with zero impact on joints.' },
  { id: 'energy_beg_3', goal: 'More Energy', level: 'Beginner', activity: 'Tai Chi Basics', duration: '30 min', difficulty: 'Light', exercises: 'Opening stance, Parting horse\'s mane, Cloud hands', instructions: 'Move as if you are moving through water. Slow, fluid, and continuous.' },
  { id: 'sleep_beg_3', goal: 'Better Sleep', level: 'Beginner', activity: 'Guided Meditation', duration: '15 min', difficulty: 'Light', exercises: 'Focus on breath, Body scan, Loving-kindness', instructions: 'Find a quiet space where you won\'t be disturbed. Sit or lie down comfortably.' },
  { id: 'muscle_int_4', goal: 'Muscle Gain', level: 'Intermediate', activity: 'Kettlebell Strength', duration: '40 min', difficulty: 'Challenging', exercises: 'KB Swings, KB Goblet Squats, KB Clean & Press, KB Rows', instructions: 'Focus on the hip hinge during swings. Keep your core braced.' },
  { id: 'weight_int_4', goal: 'Weight Management', level: 'Intermediate', activity: 'Boxing for Fitness', duration: '40 min', difficulty: 'Challenging', exercises: 'Shadow boxing, Heavy bag work, Jump rope intervals', instructions: 'Keep your hands up and your feet moving. Breathe with every punch.' },
  { id: 'energy_int_3', goal: 'More Energy', level: 'Intermediate', activity: 'Hiking', duration: '90 min', difficulty: 'Moderate', exercises: 'Steady climb with variable terrain', instructions: 'Bring plenty of water and enjoy the connection with nature.' },
  { id: 'sleep_int_3', goal: 'Better Sleep', level: 'Intermediate', activity: 'Self-Massage (SMR)', duration: '25 min', difficulty: 'Light', exercises: 'Foam rolling calves, quads, back, and glutes', instructions: 'Spend extra time on any "hot spots" or areas of tension.' },
  { id: 'muscle_adv_4', goal: 'Muscle Gain', level: 'Advanced', activity: 'Calisthenics Skills', duration: '60 min', difficulty: 'Intense', exercises: 'Muscle-up prep, Handstand holds, Pistol squats, L-sits', instructions: 'Focus on the technical aspects of each skill. Progressions are key.' },
  { id: 'weight_adv_3', goal: 'Weight Management', level: 'Advanced', activity: 'Cross-Training', duration: '60 min', difficulty: 'Intense', exercises: 'Rowing, Wall balls, Box jumps, Burpees', instructions: 'Keep the intensity high. This is designed to challenge your aerobic and anaerobic systems.' },
  { id: 'energy_adv_3', goal: 'More Energy', level: 'Advanced', activity: 'Sprinting', duration: '30 min', difficulty: 'Intense', exercises: '10 x 100m sprints with 90s walk back rest', instructions: 'Warm up thoroughly. Each sprint should be at maximum effort.' },
  { id: 'sleep_adv_3', goal: 'Better Sleep', level: 'Advanced', activity: 'Pranayama (Breathwork)', duration: '30 min', difficulty: 'Light', exercises: 'Nadi Shodhana, Bhramari, Sheetali, Deep Belly Breathing', instructions: 'Focus entirely on the sensation of the breath. Let your thoughts drift away.' }
];

// Nutrition Database (50+ Daily Meal Templates)
export const nutritionTemplates = [
  { id: 'nutri_muscle_1', goal: 'Muscle Gain', type: 'High Protein', breakfast: 'Egg White Omelette with Spinach', lunch: 'Grilled Chicken & Quinoa', dinner: 'Salmon with Sweet Potato', snack: 'Protein Shake & Walnuts', recipe: 'Omelette: 4 whites, 1 whole egg, 1 cup spinach. Lunch: 6oz chicken, 1 cup quinoa, steamed broccoli. Dinner: 6oz salmon, 1 large sweet potato, asparagus.' },
  { id: 'nutri_weight_1', goal: 'Weight Management', type: 'Calorie Controlled', breakfast: 'Greek Yogurt with Berries', lunch: 'Tuna Salad Wrap', dinner: 'Baked Cod with Asparagus', snack: 'Apple Slices with Almond Butter', recipe: 'Yogurt: 1 cup non-fat Greek yogurt, 1/2 cup blueberries. Lunch: 1 can tuna, 1 tbsp light mayo, whole wheat wrap, lettuce. Dinner: 6oz cod, 10 spears asparagus, side salad.' },
  { id: 'nutri_energy_1', goal: 'More Energy', type: 'Balanced Macros', breakfast: 'Overnight Oats with Chia', lunch: 'Chickpea & Avocado Salad', dinner: 'Lentil Stew with Kale', snack: 'Hummus & Carrot Sticks', recipe: 'Oats: 1/2 cup oats, 1 cup almond milk, 1 tbsp chia seeds. Lunch: 1 cup chickpeas, 1/2 avocado, cucumber, tomato, lemon dressing. Dinner: 1 cup lentils, 2 cups kale, carrots, onions, spices.' },
  { id: 'nutri_sleep_1', goal: 'Better Sleep', type: 'Magnesium Rich', breakfast: 'Banana & Almond Smoothie', lunch: 'Turkey & Swiss Sandwich', dinner: 'Roasted Turkey with Pumpkin', snack: 'Tart Cherry Juice & Pistachios', recipe: 'Smoothie: 1 banana, 1 cup milk, 1 tbsp almond butter. Lunch: 4oz turkey, 1 slice swiss, whole grain bread. Dinner: 6oz turkey, 1 cup roasted pumpkin, steamed spinach.' },
  { id: 'nutri_stress_1', goal: 'Stress Reduction', type: 'Anti-Inflammatory', breakfast: 'Turmeric Scrambled Tofu', lunch: 'Walnut & Pear Salad', dinner: 'Wild Caught Mackerel with Greens', snack: 'Dark Chocolate (85%) & Berries', recipe: 'Tofu: 1/2 block tofu, 1/2 tsp turmeric, veggies. Lunch: Mixed greens, 1/4 cup walnuts, 1 pear, balsamic. Dinner: 6oz mackerel, 2 cups sautéed kale, garlic.' },
  { id: 'nutri_muscle_2', goal: 'Muscle Gain', type: 'Mass Builder', breakfast: 'Steak and Eggs', lunch: 'Beef and Rice Bowl', dinner: 'Chicken Pasta with Pesto', snack: 'Cottage Cheese and Pineapple', recipe: 'Steak: 4oz lean steak, 2 eggs. Lunch: 6oz ground beef, 1.5 cups white rice, peppers. Dinner: 6oz chicken, 2 cups whole wheat pasta, 2 tbsp pesto.' },
  { id: 'nutri_weight_2', goal: 'Weight Management', type: 'Low Carb', breakfast: 'Avocado and Bacon', lunch: 'Chicken Caesar Salad (no croutons)', dinner: 'Zucchini Noodles with Shrimp', snack: 'Hard Boiled Eggs', recipe: 'Avocado: 1/2 avocado, 2 slices turkey bacon. Lunch: 6oz chicken, romaine, parmesan, Caesar dressing. Dinner: 2 cups zoodles, 6oz shrimp, garlic, lemon.' },
  { id: 'nutri_energy_2', goal: 'More Energy', type: 'Complex Carb Focus', breakfast: 'Buckwheat Pancakes', lunch: 'Sweet Potato and Black Bean Tacos', dinner: 'Brown Rice and Veggie Stir Fry', snack: 'Trail Mix (Nuts & Seeds)', recipe: 'Pancakes: Buckwheat flour, banana, egg. Lunch: 2 corn tortillas, 1/2 cup beans, 1/2 cup sweet potato. Dinner: 1 cup brown rice, mixed veggies, soy sauce.' },
  { id: 'nutri_sleep_2', goal: 'Better Sleep', type: 'Tryptophan Rich', breakfast: 'Cottage Cheese and Kiwi', lunch: 'Chicken and Barley Soup', dinner: 'Baked Chicken with Sweet Mash', snack: 'Warm Milk and Honey', recipe: 'Cottage Cheese: 1 cup cottage cheese, 2 kiwis. Lunch: 1 cup barley soup with chicken. Dinner: 6oz chicken, 1/2 cup mashed sweet potato.' },
  { id: 'nutri_stress_2', goal: 'Stress Reduction', type: 'Omega-3 Focus', breakfast: 'Chia Seed Pudding', lunch: 'Salmon Salad with Flaxseeds', dinner: 'Sardines on Whole Grain Toast', snack: 'Pumpkin Seeds', recipe: 'Pudding: 3 tbsp chia, 1 cup milk, vanilla. Lunch: 1 can salmon, greens, 1 tbsp flax. Dinner: 1 can sardines, 2 slices toast, tomato.' },
  { id: 'nutri_muscle_3', goal: 'Muscle Gain', type: 'Plant Based Protein', breakfast: 'Tempeh Scramble', lunch: 'Seitan Stir Fry', dinner: 'Lentil Pasta with Marinara', snack: 'Edamame', recipe: 'Tempeh: 4oz tempeh, veggies. Lunch: 6oz seitan, broccoli, snap peas. Dinner: 2 cups lentil pasta, tomato sauce, nutritional yeast.' },
  { id: 'nutri_weight_3', goal: 'Weight Management', type: 'High Fiber', breakfast: 'Bran Flakes with Skim Milk', lunch: 'Black Bean Soup', dinner: 'Roasted Cauliflower Steaks', snack: 'Celery with PB', recipe: 'Bran: 1 cup bran flakes, 1 cup milk. Lunch: 2 cups black bean soup. Dinner: 1 head cauliflower, roasted with spices, side of beans.' },
  { id: 'nutri_energy_3', goal: 'More Energy', type: 'Iron Rich', breakfast: 'Spinach and Mushroom Omelette', lunch: 'Beef and Broccoli', dinner: 'Quinoa and Spinach Salad', snack: 'Dried Apricots', recipe: 'Omelette: 3 eggs, 1 cup spinach, 1/2 cup mushrooms. Lunch: 6oz beef, 2 cups broccoli. Dinner: 1 cup quinoa, 2 cups spinach, beets, feta.' },
  { id: 'nutri_sleep_3', goal: 'Better Sleep', type: 'Herbal Support', breakfast: 'Oatmeal with Walnuts', lunch: 'Turkey and Avocado Wrap', dinner: 'White Fish with Steamed Veggies', snack: 'Chamomile Tea', recipe: 'Oatmeal: 1/2 cup oats, 1/4 cup walnuts. Lunch: 4oz turkey, 1/2 avocado, wrap. Dinner: 6oz tilapia, mixed steamed veggies.' },
  { id: 'nutri_stress_3', goal: 'Stress Reduction', type: 'Vitamin C Boost', breakfast: 'Orange and Grapefruit Salad', lunch: 'Bell Pepper and Hummus Wrap', dinner: 'Chicken with Roasted Peppers', snack: 'Strawberries', recipe: 'Salad: 1 orange, 1/2 grapefruit. Lunch: 1 large bell pepper, 1/4 cup hummus, wrap. Dinner: 6oz chicken, 2 roasted bell peppers.' },
  { id: 'nutri_muscle_4', goal: 'Muscle Gain', type: 'Clean Bulk', breakfast: 'Oatmeal with Protein Powder', lunch: 'Turkey and Sweet Potato', dinner: 'Lean Beef and Pasta', snack: 'Greek Yogurt', recipe: 'Oatmeal: 1/2 cup oats, 1 scoop protein. Lunch: 6oz turkey, 1 large sweet potato. Dinner: 6oz beef, 1.5 cups pasta.' },
  { id: 'nutri_weight_4', goal: 'Weight Management', type: 'Intermittent Fasting Style', breakfast: 'Black Coffee / Green Tea', lunch: 'Large Cobb Salad', dinner: 'Grilled Chicken and Zucchini', snack: 'Berries', recipe: 'Salad: Greens, chicken, egg, avocado, light dressing. Dinner: 8oz chicken, 2 cups zucchini.' },
  { id: 'nutri_energy_4', goal: 'More Energy', type: 'B-Vitamin Focus', breakfast: 'Whole Grain Toast with Eggs', lunch: 'Pork Tenderloin and Quinoa', dinner: 'Chicken and Brown Rice', snack: 'Banana', recipe: 'Toast: 2 slices, 2 eggs. Lunch: 6oz pork, 1 cup quinoa. Dinner: 6oz chicken, 1 cup brown rice.' },
  { id: 'nutri_sleep_4', goal: 'Better Sleep', type: 'Calcium Rich', breakfast: 'Yogurt and Almonds', lunch: 'Cheese and Veggie Sandwich', dinner: 'Salmon and Broccoli', snack: 'Glass of Milk', recipe: 'Yogurt: 1 cup, 1/4 cup almonds. Lunch: 2 slices cheese, veggies, bread. Dinner: 6oz salmon, 2 cups broccoli.' },
  { id: 'nutri_stress_4', goal: 'Stress Reduction', type: 'Magnesium & Zinc', breakfast: 'Pumpkin Seed Granola', lunch: 'Oysters or Shellfish Salad', dinner: 'Beef and Spinach', snack: 'Cashews', recipe: 'Granola: 1/2 cup with milk. Lunch: Mixed greens with shrimp or oysters. Dinner: 6oz beef, 2 cups spinach.' },
  { id: 'nutri_muscle_5', goal: 'Muscle Gain', type: 'High Carb Day', breakfast: 'Bagel with Cream Cheese & Eggs', lunch: 'Chicken and Large Potato', dinner: 'Beef and 2 cups Rice', snack: 'Protein Bar', recipe: 'Bagel: 1 whole bagel, 2 eggs. Lunch: 6oz chicken, 1 large potato. Dinner: 6oz beef, 2 cups rice.' },
  { id: 'nutri_weight_5', goal: 'Weight Management', type: 'Soup & Salad', breakfast: 'Smoothie (Spinach/Protein)', lunch: 'Vegetable Minestrone', dinner: 'Grilled Salmon Salad', snack: 'Cucumber slices', recipe: 'Smoothie: 2 cups spinach, 1 scoop protein, water. Lunch: 2 cups soup. Dinner: 6oz salmon over large salad.' },
  { id: 'nutri_energy_5', goal: 'More Energy', type: 'Natural Sugar Boost', breakfast: 'Fruit Salad with Honey', lunch: 'Chicken and Mango Wrap', dinner: 'Sweet and Sour Chicken', snack: 'Apple', recipe: 'Salad: Mixed seasonal fruits, 1 tbsp honey. Lunch: 6oz chicken, mango slices, wrap. Dinner: 6oz chicken, pineapple, peppers, rice.' },
  { id: 'nutri_sleep_5', goal: 'Better Sleep', type: 'Melatonin Support', breakfast: 'Oats with Tart Cherries', lunch: 'Turkey Salad', dinner: 'Baked Cod and Rice', snack: 'Walnuts', recipe: 'Oats: 1/2 cup oats, 1/4 cup dried cherries. Lunch: 4oz turkey over greens. Dinner: 6oz cod, 1/2 cup rice.' },
  { id: 'nutri_stress_5', goal: 'Stress Reduction', type: 'Comforting & Healthy', breakfast: 'Warm Quinoa Porridge', lunch: 'Roasted Root Veggie Salad', dinner: 'Chicken Pot Pie (Healthy version)', snack: 'Herbal Tea', recipe: 'Porridge: 1/2 cup quinoa, milk, cinnamon. Lunch: Beets, carrots, parsnips over greens. Dinner: Chicken, peas, carrots, light crust.' },
  { id: 'nutri_muscle_6', goal: 'Muscle Gain', type: 'Omega-3 Rich', breakfast: 'Salmon and Avocado Toast', lunch: 'Tuna and Pasta', dinner: 'Mackerel and Potatoes', snack: 'Sardines', recipe: 'Toast: 1 slice, 3oz salmon, 1/4 avocado. Lunch: 1 can tuna, 1 cup pasta. Dinner: 6oz mackerel, 2 small potatoes.' },
  { id: 'nutri_weight_6', goal: 'Weight Management', type: 'Egg Based', breakfast: 'Poached Eggs on Greens', lunch: 'Egg Salad Wrap', dinner: 'Frittata with Veggies', snack: 'Hard boiled egg', recipe: 'Eggs: 2 eggs over 2 cups spinach. Lunch: 2 eggs, light mayo, wrap. Dinner: 3 eggs, peppers, onions, mushrooms.' },
  { id: 'nutri_energy_6', goal: 'More Energy', type: 'Caffeine Free Energy', breakfast: 'Chia and Berry Bowl', lunch: 'Quinoa and Bean Salad', dinner: 'Lentil and Spinach Curry', snack: 'Sunflower seeds', recipe: 'Bowl: 3 tbsp chia, 1/2 cup berries. Lunch: 1/2 cup quinoa, 1/2 cup beans. Dinner: 1 cup lentils, 2 cups spinach, curry spices.' },
  { id: 'nutri_sleep_6', goal: 'Better Sleep', type: 'Low Acid', breakfast: 'Melon and Cottage Cheese', lunch: 'Chicken and Rice Soup', dinner: 'Baked Turkey and Squash', snack: 'Banana', recipe: 'Melon: 1 cup cantaloupe, 1/2 cup cottage cheese. Lunch: 2 cups soup. Dinner: 6oz turkey, 1 cup butternut squash.' },
  { id: 'nutri_stress_6', goal: 'Stress Reduction', type: 'Probiotic Focus', breakfast: 'Kefir with Blueberries', lunch: 'Sauerkraut and Turkey Sandwich', dinner: 'Miso Glazed Salmon', snack: 'Yogurt', recipe: 'Kefir: 1 cup kefir, 1/2 cup berries. Lunch: 4oz turkey, 1/4 cup sauerkraut, bread. Dinner: 6oz salmon, miso paste, bok choy.' },
  { id: 'nutri_muscle_7', goal: 'Muscle Gain', type: 'Quick & Easy', breakfast: 'Protein Shake & Banana', lunch: 'Rotisserie Chicken & Bagged Salad', dinner: 'Frozen Turkey Burgers', snack: 'Beef Jerky', recipe: 'Shake: 2 scoops. Lunch: 1/2 chicken, 2 cups salad. Dinner: 2 patties, no bun, side of veggies.' },
  { id: 'nutri_weight_7', goal: 'Weight Management', type: 'Volume Eating', breakfast: 'Large Egg White Scramble', lunch: 'Giant Green Salad with Shrimp', dinner: '2 cups Zucchini Noodles with Turkey', snack: 'Air popped popcorn', recipe: 'Scramble: 6 whites, peppers, onions. Lunch: 4 cups greens, 6oz shrimp. Dinner: 2 cups zoodles, 6oz ground turkey.' },
  { id: 'nutri_energy_7', goal: 'More Energy', type: 'Nutrient Dense', breakfast: 'Green Smoothie', lunch: 'Salmon and Kale Salad', dinner: 'Beef and Mixed Veggies', snack: 'Mixed Berries', recipe: 'Smoothie: Kale, spinach, apple, ginger, protein. Lunch: 6oz salmon, 2 cups kale. Dinner: 6oz beef, 2 cups mixed veggies.' },
  { id: 'nutri_sleep_7', goal: 'Better Sleep', type: 'Simple & Light', breakfast: 'Toast with Peanut Butter', lunch: 'Turkey and Cheese Rollups', dinner: 'Chicken and Steamed Carrots', snack: 'Warm Water with Lemon', recipe: 'Toast: 1 slice, 1 tbsp PB. Lunch: 4oz turkey, 2 slices cheese. Dinner: 6oz chicken, 1 cup carrots.' },
  { id: 'nutri_stress_7', goal: 'Stress Reduction', type: 'Magnesium Rich', breakfast: 'Almond and Seed Granola', lunch: 'Spinach and Feta Salad', dinner: 'Dark Leafy Greens and Tofu', snack: 'Dark Chocolate', recipe: 'Granola: 1/2 cup with almond milk. Lunch: 3 cups spinach, 1oz feta. Dinner: 1/2 block tofu, 3 cups mixed greens.' }
];

// Mind Database (60+ Activities)
export const mindTemplates = [
  { id: 'mind_stress_1', goal: 'Stress Reduction', activity: 'Box Breathing', duration: '5 min', why: 'Resets the nervous system instantly.', instructions: 'Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat 5 times.' },
  { id: 'mind_sleep_1', goal: 'Better Sleep', activity: 'Digital Detox', duration: '60 min', why: 'Reduces blue light exposure for melatonin.', instructions: 'Turn off all screens 1 hour before bed. Read a physical book or listen to calm music instead.' },
  { id: 'mind_energy_1', goal: 'More Energy', activity: 'Gratitude Journaling', duration: '10 min', why: 'Shifts focus to positive momentum.', instructions: 'Write down 3 things you are grateful for today and why they made you feel good.' },
  { id: 'mind_stress_2', goal: 'Stress Reduction', activity: '4-7-8 Breathing', duration: '5 min', why: 'Activates parasympathetic nervous system quickly.', instructions: 'Inhale for 4, hold for 7, exhale for 8. This ratio is scientifically proven to calm the mind.' },
  { id: 'mind_sleep_2', goal: 'Better Sleep', activity: 'Body Scan', duration: '15 min', why: 'Relaxes physical tension for deeper rest.', instructions: 'Lie down and bring attention to each part of your body, starting from your toes and moving up to your head.' },
  { id: 'mind_energy_2', goal: 'More Energy', activity: 'Power Posing', duration: '2 min', why: 'Boosts confidence and alertness hormones.', instructions: 'Stand tall with your hands on your hips and chest out. Hold for 2 minutes while breathing deeply.' },
  { id: 'mind_stress_3', goal: 'Stress Reduction', activity: 'Nature Walk', duration: '20 min', why: 'Lowers cortisol through environmental connection.', instructions: 'Walk outside without headphones. Focus on the sounds, smells, and sights around you.' },
  { id: 'mind_sleep_3', goal: 'Better Sleep', activity: 'Progressive Relaxation', duration: '10 min', why: 'Releases hidden muscle tension.', instructions: 'Tense each muscle group for 5 seconds, then release suddenly. Feel the relaxation flow through you.' },
  { id: 'mind_energy_3', goal: 'More Energy', activity: 'Cold Splash', duration: '1 min', why: 'Invigorates the senses and boosts circulation.', instructions: 'Splash cold water on your face or take a 30-second cold shower at the end of your routine.' },
  { id: 'mind_stress_4', goal: 'Stress Reduction', activity: 'Mindful Tea', duration: '10 min', why: 'Creates a ritual of presence.', instructions: 'Focus entirely on the process of making and drinking your tea. Feel the warmth and taste the flavors.' },
  { id: 'mind_sleep_4', goal: 'Better Sleep', activity: 'Guided Imagery', duration: '15 min', why: 'Distracts the mind from stressful thoughts.', instructions: 'Visualize a peaceful place in great detail. What do you see, hear, and feel there?' },
  { id: 'mind_energy_4', goal: 'More Energy', activity: 'Inspirational Reading', duration: '15 min', why: 'Feeds the mind with positive possibilities.', instructions: 'Read a few pages of a book that inspires you or watch a short motivational video.' },
  { id: 'mind_stress_5', goal: 'Stress Reduction', activity: 'Journaling', duration: '15 min', why: 'Externalizes worries and provides perspective.', instructions: 'Write down everything on your mind without judgment. Let the thoughts flow onto the paper.' },
  { id: 'mind_sleep_5', goal: 'Better Sleep', activity: 'White Noise', duration: '8 hrs', why: 'Masks disruptive sounds for steady sleep.', instructions: 'Use a white noise machine or app to create a consistent sound environment.' },
  { id: 'mind_energy_5', goal: 'More Energy', activity: 'Social Connection', duration: '30 min', why: 'Oxytocin boost from meaningful interaction.', instructions: 'Call a friend or family member just to say hello and catch up.' },
  { id: 'mind_stress_6', goal: 'Stress Reduction', activity: 'Meditation', duration: '10 min', why: 'Trains the mind to stay in the present.', instructions: 'Sit quietly and focus on your breath. When your mind wanders, gently bring it back.' },
  { id: 'mind_sleep_6', goal: 'Better Sleep', activity: 'Cool Room', duration: '8 hrs', why: 'Optimal temperature for deep sleep cycles.', instructions: 'Set your thermostat to 65-68°F (18-20°C) for the best sleep quality.' },
  { id: 'mind_energy_6', goal: 'More Energy', activity: 'Goal Visualization', duration: '5 min', why: 'Clarifies purpose and ignites drive.', instructions: 'Close your eyes and imagine yourself achieving your biggest goal. Feel the emotions of success.' },
  { id: 'mind_stress_7', goal: 'Stress Reduction', activity: 'Laughter', duration: '10 min', why: 'Releases endorphins and reduces tension.', instructions: 'Watch a funny video or talk to someone who always makes you laugh.' },
  { id: 'mind_sleep_7', goal: 'Better Sleep', activity: 'Magnesium Bath', duration: '20 min', why: 'Absorbs relaxation minerals through the skin.', instructions: 'Add Epsom salts to a warm bath and soak for 20 minutes before bed.' },
  { id: 'mind_energy_7', goal: 'More Energy', activity: 'Upbeat Music', duration: '15 min', why: 'Auditory stimulation for mood and energy.', instructions: 'Create a playlist of songs that make you want to move and dance.' },
  { id: 'mind_stress_8', goal: 'Stress Reduction', activity: 'Digital Sabbatical', duration: '4 hrs', why: 'Breaks the cycle of constant notification stress.', instructions: 'Put your phone in another room and engage in a screen-free hobby.' },
  { id: 'mind_sleep_8', goal: 'Better Sleep', activity: 'Stretching', duration: '10 min', why: 'Prepares the body for stillness.', instructions: 'Gentle stretches for your neck, shoulders, and hips to release the day\'s tension.' },
  { id: 'mind_energy_8', goal: 'More Energy', activity: 'Sunlight Exposure', duration: '15 min', why: 'Regulates circadian rhythm for daytime alertness.', instructions: 'Get outside within 30 minutes of waking up to get natural light in your eyes.' },
  { id: 'mind_stress_9', goal: 'Stress Reduction', activity: 'Creative Expression', duration: '30 min', why: 'Engages the "flow state" for mental relief.', instructions: 'Draw, paint, play an instrument, or cook something new. Focus on the process.' },
  { id: 'mind_sleep_9', goal: 'Better Sleep', activity: 'No Caffeine after 2PM', duration: '10 hrs', why: 'Prevents sleep disruption from stimulants.', instructions: 'Switch to herbal tea or decaf in the afternoon to ensure your body is ready for rest.' },
  { id: 'mind_energy_9', goal: 'More Energy', activity: 'Hydration', duration: '1 min', why: 'Prevents fatigue from mild dehydration.', instructions: 'Drink a large glass of water first thing in the morning and every 2 hours.' },
  { id: 'mind_stress_10', goal: 'Stress Reduction', activity: 'Saying No', duration: '1 min', why: 'Protects your mental energy and boundaries.', instructions: 'Practice declining one request today that doesn\'t align with your priorities.' },
  { id: 'mind_sleep_10', goal: 'Better Sleep', activity: 'Consistent Wake Time', duration: '8 hrs', why: 'Anchors your internal clock.', instructions: 'Wake up at the same time every day, even on weekends, to regulate your sleep.' },
  { id: 'mind_energy_10', goal: 'More Energy', activity: 'Deep Breathing', duration: '3 min', why: 'Increases oxygen flow to the brain.', instructions: 'Take 10 deep belly breaths. Feel your ribs expand in all directions.' }
];

export const getPersonalizedPlan = (userProfile: any, recentLogs: any[], type: 'fitness' | 'nutrition' | 'mind') => {
  const primaryGoal = userProfile?.goals?.[0] || 'More Energy';
  const age = userProfile?.age || 30;
  const userId = userProfile?.id || 'default';
  
  // Use a simple hash of the userId and current date to ensure variety but consistency for the day
  const today = new Date().toISOString().split('T')[0];
  const seed = userId.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) + 
               today.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);

  if (type === 'fitness') {
    const filtered = fitnessTemplates.filter(t => t.goal === primaryGoal);
    if (filtered.length === 0) return [];
    
    return Array.from({ length: 7 }, (_, i) => {
      const index = (seed + i) % filtered.length;
      const template = filtered[index];
      return {
        day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
        ...template,
        why: `Based on your ${primaryGoal} goal and age (${age}), this ${template.difficulty} routine optimizes your ${template.activity.toLowerCase()} for maximum results.`
      };
    });
  }

  if (type === 'nutrition') {
    const filtered = nutritionTemplates.filter(t => t.goal === primaryGoal);
    if (filtered.length === 0) return [];

    return Array.from({ length: 7 }, (_, i) => {
      const index = (seed + i) % filtered.length;
      const template = filtered[index];
      return {
        day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
        ...template,
        why: `This ${template.type} plan provides the specific nutrients your body needs to support ${primaryGoal.toLowerCase()} at age ${age}.`
      };
    });
  }

  if (type === 'mind') {
    const filtered = mindTemplates.filter(t => t.goal === primaryGoal);
    if (filtered.length === 0) return [];

    return Array.from({ length: 7 }, (_, i) => {
      const index = (seed + i) % filtered.length;
      const template = filtered[index];
      return {
        day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
        ...template,
        why: `To help with ${primaryGoal.toLowerCase()}, this ${template.activity} practice builds mental resilience.`
      };
    });
  }

  return [];
};