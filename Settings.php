<?php
/**
 * This code is licensed under AGPLv3 license or Afterlogic Software License
 * if commercial version of the product was purchased.
 * For full statements of the licenses see LICENSE-AFTERLOGIC and LICENSE-AGPL3 files.
 */

namespace Aurora\Modules\ContactsMobileWebclient;

/**
 * @property bool $Disabled
 * @property bool $IncludeInMobile
 * @property bool $IncludeInDesktop
 * @property array $RequireInMobile
 */

use Aurora\System\SettingsProperty;

class Settings extends \Aurora\System\Module\Settings
{
    protected function initDefaults()
    {
        $this->aContainer = [
            "Disabled" => new SettingsProperty(
                false,
                "bool",
                null,
                "Setting to true disables the module",
            ),
            "IncludeInMobile" => new SettingsProperty(
                true,
                "bool",
                null,
                "If true, the module is used in mobile version of the interface",
            ),
            "IncludeInDesktop" => new SettingsProperty(
                false,
                "bool",
                null,
                "If true, the module is used in desktop version of the interface",
            ),
            "RequireInMobile" => new SettingsProperty(
                [
                    "ContactsWebclient"
                ],
                "array",
                null,
                "List of other modules required by this module",
            ),
        ];
    }
}
