import mongoose from 'mongoose';

const UrlSchema = mongoose.Schema({
  token: String,
  originalUrl: String,
}, {
  timestamps: { currentTime: () => +Date.now() },
});

const UrlData = mongoose.model('UrlData', UrlSchema);

export default UrlData;
