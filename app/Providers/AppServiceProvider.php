<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\UrlGenerator;
use Inertia\Inertia;
use App\Models\House;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(UrlGenerator $url): void
    {
        if (env('APP_ENV') == 'production') {
            $url->forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'houses' => fn() => House::select('name', 'slug')->get(),
            'flash' => fn() => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }
}
