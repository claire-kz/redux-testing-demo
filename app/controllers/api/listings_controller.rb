class Api::ListingsController < ApplicationController
  def index
    @listings = Listing.all
  end

  def show
    @listing = Listing.find(params[:id])
  end

  def create
    @listing = Listing.new(listing_params)

    if @listing.save
      render :show
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def update
    @listing = Listing.find(params[:id])

    if @listing.update(listing_params)
      render :show
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def destroy
    @listing = Listing.find(params[:id])

    if @listing.destroy
      render :show
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  private

  def listing_params
    params.require(:listing).permit(:title, :body)
  end
end
