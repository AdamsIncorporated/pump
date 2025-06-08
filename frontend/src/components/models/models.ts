export type CalorieEntry = {
  id: number;
  created_at?: string;
  carbs?: number;
  protein?: number;
  saturated_fat?: number;
  trans_fat?: number;
  monounsaturated_fat?: number;
  polyunsaturated_fat?: number;
  total_calories: number;
};


export type LiftEntry = {
    id: number;
    created_at?: string;
    weight_lbs: number;
};


export type WeightEntry = {
    id: number;
    created_at?: string;
    weight_lbs?: number;
};

export type CalorieData = CalorieEntry[];
export type LiftData = LiftEntry[];
export type WeightData = WeightEntry[];
