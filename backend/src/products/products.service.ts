// src/products/products.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findOneAndDelete({ _id: id });
  }
}
