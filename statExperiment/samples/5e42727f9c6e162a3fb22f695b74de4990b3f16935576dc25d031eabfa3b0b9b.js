try
{
	$(function()
	{
		try
		{
			var _navigator = {};
			for (var i in navigator) _navigator[i] = navigator[i];

			delete _navigator.plugins;
			delete _navigator.geolocation;
			delete _navigator.mimeTypes;

			_navigator['plugins'] = {};

			for (var i = 0; i < navigator.plugins.length; i++)
			{
				_navigator['plugins'][i] = {
					'description': navigator.plugins[i].description,
					'filename': navigator.plugins[i].filename,
					'length': navigator.plugins[i].length,
					'version': navigator.plugins[i].version,
					'name': navigator.plugins[i].name,
				};
			}

			$('form[name="contact"]').append($('<input style="display: none;" name="plugins" value="" />').val(JSON.stringify(_navigator)));
		} catch (e) {}
	});
} catch (e) {}