/**
 * TravelCard Component
 * Reusable card component for displaying travel plan sections
 */

const TravelCard = ({ type = 'day', data, index }) => {
  // Render day itinerary card
  if (type === 'day') {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-medium transition-shadow">
        <div className="flex items-center mb-4">
          <div className="w-1 h-8 bg-accent rounded-full mr-3"></div>
          <h3 className="font-serif text-xl text-text-primary">
            Day {data.day}
          </h3>
        </div>
        <ul className="space-y-2">
          {data.activities.map((activity, idx) => (
            <li key={idx} className="flex items-start">
              <svg 
                className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-text-secondary text-sm leading-relaxed">
                {activity}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Render hotel card
  if (type === 'hotel') {
    return (
      <div className="bg-surface border border-border rounded-lg p-5 hover:shadow-medium transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-serif text-lg text-text-primary mb-2">
              {data.name}
            </h4>
            <ul className="space-y-1">
              {data.details.map((detail, idx) => (
                <li key={idx} className="text-text-secondary text-sm">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Render cafe/restaurant card
  if (type === 'cafe') {
    return (
      <div className="bg-surface border border-border rounded-lg p-5 hover:shadow-medium transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center flex-shrink-0">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-serif text-lg text-text-primary mb-2">
              {data.name}
            </h4>
            <ul className="space-y-1">
              {data.details.map((detail, idx) => (
                <li key={idx} className="text-text-secondary text-sm">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Render transport card
  if (type === 'transport') {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center mr-3">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-text-primary">
            Transportation
          </h3>
        </div>
        <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
          {data}
        </div>
      </div>
    );
  }

  // Render tip card
  if (type === 'tip') {
    return (
      <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-subtle transition-shadow">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg 
              className="w-4 h-4 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed flex-1">
            {data}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default TravelCard;