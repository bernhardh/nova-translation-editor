<?php

namespace Bernhardh\NovaTranslationEditor;

use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\Lang;
use Spatie\TranslationLoader\LanguageLine;

class NovaTranslationEditorController extends Controller
{
    use ValidatesRequests;

    /**
     * @param Request $request
     *
     * @return array
     */
    public function index(Request $request)
    {
        $config = config('nova-translation-editor');
        $groups = $config['groups'] ?: [];
        $languages = $config['languages'] ?: ['en'];
        $response = [
            'languages' => $languages,
            'translations' => [],
        ];

        foreach ($groups as $group) {
            $response['translations'][$group] = [];
            foreach ($languages as $lang) {
                $array = Lang::get($group, [], $lang);
                if (is_array($array)) {
                    $this->loopTranslationArray($array, $response['translations'][$group], $lang);
                }
            }
        }

        return inertia('NovaTranslationEditor', [
            'translations' => $response['translations'],
            'languages' => $response['languages'],
        ]);
    }

    /**
     * @param array $array
     * @param array $grouped
     * @param string $lang
     * @param string|null $prependKey
     */
    protected function loopTranslationArray(array $array, array &$grouped, string $lang, ?string $prependKey = '')
    {
        foreach ($array as $key => $value) {
            $realKey = $prependKey.$key;

            if (is_array($value)) {
                $this->loopTranslationArray($value, $grouped, $lang, $realKey.'.');
            } else {
                if (! isset($grouped[$realKey])) {
                    $grouped[$realKey] = [];
                }
                $grouped[$realKey][$lang] = $value;
            }
        }
    }

    /**
     * @param Request $request
     *
     * @return void
     */
    public function save(Request $request)
    {
        $translationModel = app(config('translation-loader.model'));

        collect($request->post('data'))->each(function ($group, $groupKey) use ($translationModel) {
            collect($group)->each(function ($row, $key) use ($groupKey, $translationModel) {
                $translationModel::updateOrCreate([
                    'group' => $groupKey,
                    'key'   => $key,
                ], [
                    'text' => $row,
                ]);
            });
        });
    }
}
