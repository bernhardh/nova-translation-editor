<?php

namespace Bernhardh\NovaTranslationEditor;

use Laravel\Nova\Menu\MenuSection;
use Laravel\Nova\Nova;
use Laravel\Nova\Tool;
use Illuminate\Http\Request;


class NovaTranslationEditor extends Tool
{
    /**
     * Perform any tasks that need to happen when the tool is booted.
     *
     * @return void
     */
    public function boot()
    {
        Nova::script('nova-translation-editor', __DIR__ . '/../dist/js/tool.js');
        Nova::style('nova-translation-editor', __DIR__ . '/../dist/css/tool.css');
    }

    /**
     * Build the menu that renders the navigation links for the tool.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function menu(Request $request)
    {
        return MenuSection::make('Languages')
            ->path('nova-translation-editor/index')
            ->icon('translate');
    }
}
