class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }

  private

  def create_error_api_response(resource)
    {errors: resource.errors.full_messages}
  end
end
