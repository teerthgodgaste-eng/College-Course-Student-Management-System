const DashboardCard = ({ title, value, icon: Icon, trend, trendValue }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className="stat-card-icon">
          <Icon size={20} />
        </div>
      </div>
      <div className="stat-card-value">{value}</div>
      {trend && (
        <div className={`stat-card-change ${trend}`}>
          {trend === 'positive' ? '↑' : '↓'} {trendValue}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
