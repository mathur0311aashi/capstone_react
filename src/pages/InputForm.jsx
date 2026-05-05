import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateTripForm } from '../utils/Helpers';

/**
 * InputForm Page
 * Form for collecting trip details (destination, days, budget)
 */
const InputForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    budget: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetOptions = [
    { value: 'Low', label: 'Low Budget', description: 'Budget-friendly options' },
    { value: 'Medium', label: 'Medium Budget', description: 'Balanced comfort and cost' },
    { value: 'High', label: 'High Budget', description: 'Luxury experiences' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateTripForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Navigate to results page with form data
    setTimeout(() => {
      navigate('/results', { state: { tripData: formData } });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background py-12 page-transition">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      // Try typing "text-blue-" here to see if the dropdown appears
<label className="text-blue-600">Destination</label>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl text-text-primary mb-3">
            Plan Your Trip
          </h1>
          <p className="text-text-secondary text-lg">
            Tell us about your travel plans and let AI create your perfect itinerary
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-background border border-border rounded-lg shadow-medium p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination Input */}
            <div>
              <label 
                htmlFor="destination" 
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g., Paris, France"
                className={`w-full px-4 py-3 bg-background border rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.destination ? 'border-danger' : 'border-border'
                }`}
                aria-describedby={errors.destination ? 'destination-error' : undefined}
              />
              {errors.destination && (
                <p id="destination-error" className="mt-2 text-sm text-danger">
                  {errors.destination}
                </p>
              )}
            </div>

            {/* Number of Days Input */}
            <div>
              <label 
                htmlFor="days" 
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Number of Days
              </label>
              <input
                type="number"
                id="days"
                name="days"
                value={formData.days}
                onChange={handleChange}
                placeholder="e.g., 5"
                min="1"
                max="30"
                className={`w-full px-4 py-3 bg-background border rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent transition-colors ${
                  errors.days ? 'border-danger' : 'border-border'
                }`}
                aria-describedby={errors.days ? 'days-error' : undefined}
              />
              {errors.days && (
                <p id="days-error" className="mt-2 text-sm text-danger">
                  {errors.days}
                </p>
              )}
            </div>

            {/* Budget Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Budget Range
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {budgetOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col p-4 border rounded-md cursor-pointer transition-all hover:shadow-subtle ${
                      formData.budget === option.value
                        ? 'border-accent bg-accent bg-opacity-5'
                        : 'border-border bg-background'
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={option.value}
                      checked={formData.budget === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-text-primary">
                        {option.label}
                      </span>
                      {formData.budget === option.value && (
                        <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-text-secondary">
                      {option.description}
                    </span>
                  </label>
                ))}
              </div>
              {errors.budget && (
                <p className="mt-2 text-sm text-danger">
                  {errors.budget}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-6 py-3 bg-accent text-white rounded-md font-medium hover:bg-accent-dark transition-colors shadow-medium focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Generating Plan...
                </>
              ) : (
                <>
                  Generate Travel Plan
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-surface border border-border rounded-lg p-6">
          <h3 className="font-serif text-lg text-text-primary mb-3">
            What You'll Get
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-text-secondary text-sm">Day-by-day detailed itinerary</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-text-secondary text-sm">Hotel recommendations with pricing</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-text-secondary text-sm">Popular cafes and restaurants</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-text-secondary text-sm">Transportation options and tips</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-text-secondary text-sm">Essential travel tips and local insights</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputForm;