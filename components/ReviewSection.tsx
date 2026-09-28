'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare, ThumbsUp, PlusCircle, X } from 'lucide-react';
import { Review } from '@/types';
import { mockReviews } from '@/data/reviews';
import { useToast } from '@/context/ToastContext';
import { formatDate } from '@/lib/utils';

interface ReviewSectionProps {
  productId: string;
  productName: string;
  rating: number;
  reviewsCount: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  productId,
  productName,
  rating,
  reviewsCount,
}) => {
  const { showToast } = useToast();
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    const matched = mockReviews.filter((r) => r.productId === productId);
    return matched.length > 0 ? matched : mockReviews.slice(0, 2);
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      showToast('Please provide your name and review details.', 'error');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      author: author.trim(),
      rating: userRating,
      date: new Date().toISOString().split('T')[0],
      comment: comment.trim(),
      verifiedBuyer: true,
      helpfulCount: 0,
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsModalOpen(false);
    setAuthor('');
    setComment('');
    setUserRating(5);
    showToast('Thank you! Your botanical review was posted successfully. 🌱', 'success');
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-stone-200/80 shadow-xs">
      {/* Header & Score Breakdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-emerald-950 text-white shadow-md">
            <span className="text-3xl font-black">{rating.toFixed(1)}</span>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-emerald-300 font-medium mt-1">out of 5</span>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-black text-emerald-950">Customer Reviews</h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Based on {reviewsCount + reviewsList.length - 2} verified customer ratings for {productName}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-emerald-700">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>100% Verified Plant Buyers</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs md:text-sm font-bold shadow-sm transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Reviews List */}
      <div className="mt-6 space-y-4">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="p-4 md:p-5 rounded-2xl bg-stone-50/70 border border-stone-200/60 flex flex-col gap-2.5 transition-colors hover:bg-stone-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    {rev.author}
                    {rev.verifiedBuyer && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-stone-400">{formatDate(rev.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs md:text-sm text-stone-700 leading-relaxed">{rev.comment}</p>

            <div className="flex items-center gap-1 text-[11px] text-stone-400 pt-1">
              <ThumbsUp className="w-3 h-3 text-stone-400" />
              <span>Helpful ({rev.helpfulCount || 0})</span>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-emerald-900/10 animate-slide-up relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-black text-emerald-950">Write a Botanical Review</h3>
                <p className="text-xs text-stone-500">{productName}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Overall Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setUserRating(star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hoverRating || userRating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-emerald-800 ml-2">
                    {userRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Sona Alexander"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:border-emerald-600 outline-none"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Your Review &amp; Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details about plant health, pot quality, packaging, delivery speed..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:border-emerald-600 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-800 shadow-sm"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
