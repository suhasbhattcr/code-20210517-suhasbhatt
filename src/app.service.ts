import { Injectable } from '@nestjs/common';
import { count } from 'console';
import { userdata } from './userdata/app.constant';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getBMI(mass: number, height: number): Promise<number> {
    let bmi = (mass / height) * 100;
    return bmi;
  }

  async getBMICategoryAndHealthRisk(user: any) {
    const bmi = await this.getBMI(user.WeightKg, user.HeightCm);
    if (bmi <= 18.4) {
      return {
        category: 'Underweight',
        healthRisk: 'Malnutrition risk',
      };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return {
        category: 'Normal weight',
        healthRisk: 'Low risk',
      };
    } else if (bmi >= 25 && bmi <= 29.9) {
      return {
        category: 'Overweight',
        healthRisk: 'Enhanced risk',
      };
    } else if (bmi >= 30 && bmi <= 34.9) {
      return {
        category: 'Moderately obese',
        healthRisk: 'Medium risk',
      };
    } else if (bmi >= 35 && bmi <= 39.9) {
      return {
        category: 'Severely obese',
        healthRisk: 'High risk',
      };
    } else {
      return {
        category: 'Very severely obese',
        healthRisk: 'Very high risk',
      };
    }
  }

  async getUserDataAnalysys(userData: [] | any) {
    let result = [];
    let count = 0;

    for(let i=0 ; i<userData.length; i++){
      let bmi = await this.getBMI(userData[i].WeightKg, userData[i].HeightCm);
      let analysis = await this.getBMICategoryAndHealthRisk(userData[i]);
      if(analysis.category == 'Overweight'){
        count ++;
      }
      
      result.push({
        Gender: userData[i].Gender,
        BMI: bmi,
        BMICategory: analysis.category,
        HealthRisk: analysis.healthRisk,
      });
    }
    return {
      overweightCount: count,
      BMIAnalysisData: result,
    };
  }
}
