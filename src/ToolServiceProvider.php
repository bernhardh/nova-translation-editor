<?php

namespace Bernhardh\NovaTranslationEditor;

use Laravel\Nova\Nova;
use Laravel\Nova\Events\ServingNova;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class ToolServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->booted(function () {
            $this->routes();
        });

        $this->publishes([
            __DIR__.'/../config/nova-translation-editor.php' => config_path('nova-translation-editor.php'),
        ]);
    }

    /**
     * Register the tool's routes.
     *
     * @return void
     */
    protected function routes()
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        Nova::router(['nova'], 'nova-translation-editor')
            ->group(function () {
                Route::get('/index', [NovaTranslationEditorController::class, 'index']);
            });

        Route::middleware(['nova'])
            ->prefix('nova-vendor/nova-translation-editor')
            ->group(function () {
                Route::post('/save', [NovaTranslationEditorController::class, 'save']);
            });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/nova-translation-editor.php', 'nova-translation-editor');
    }
}
