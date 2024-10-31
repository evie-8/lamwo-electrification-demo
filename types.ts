export type Contributor = {
  name: string;
  info: string;
  url: string;
  profileImage: string;
  }

  export type NESCategoryData = {
    key: string;
    data: number;

  };

export type PowerAnalysis = {
    detail: string;
    factor_in_favour: boolean;
    source: string;
  };
  
  export type VillageData = {
    ID: number;
    NES_category: string | undefined;
    district: string;
    latitude: number;
    longitude: number;
    distanceFromArea?: number;
    max_num_buildings_in_1km_radius: number;
    mean_wind_speed: number;
    num_admin_facilities: number;
    num_buildings: number;
    num_commercial_facilities: number;
    num_education_facilities: number;
    num_health_facilities: number;
    num_permanent_buildings: number;
    num_religious_facilities: number;
    parish: string;
    power_demand_analysis: PowerAnalysis[];
    power_supply_analysis: PowerAnalysis[];
    subcounty: string;
    vegetation_percentile: number;
    village: string;
  };
  
  export type LayerKeys = 
  | "solar_home_systems"
  | "candidate_mg_site"
  | "existing_mg_site"
  | "grid_extension"
  | "grid_electricity"
  | "health_facility_buildings"
  | "administrative_buildings"
  | "commercial_buildings"
  | "school_buildings"
  | "uncategorized_buildings"
  | "candidate_MGs_layer"
  | "existing_MGs_layer";
