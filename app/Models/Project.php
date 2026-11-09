<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'constructor_id', 'title', 'slug', 'description',
        'location', 'city', 'country', 'project_type',
        'budget', 'size', 'duration', 'completion_date',
        'features', 'materials', 'is_featured', 'views', 'status'
    ];

    protected $casts = [
        'features' => 'array',
        'materials' => 'array',
        'completion_date' => 'date',
    ];

    public function constructor(): BelongsTo
    {
        return $this->belongsTo(Constructor::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}